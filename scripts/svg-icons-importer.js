const FS = require('fs');
const SVGO = require('svgo');
const unicon = require('./unicon');

const svgo = new SVGO({
    plugins: [{
        cleanupAttrs: true,
    }, {
        removeDoctype: true,
    }, {
        removeXMLProcInst: true,
    }, {
        removeComments: true,
    }, {
        removeMetadata: true,
    }, {
        removeTitle: true,
    }, {
        removeDesc: true,
    }, {
        removeUselessDefs: true,
    }, {
        removeEditorsNSData: true,
    }, {
        removeEmptyAttrs: true,
    }, {
        removeHiddenElems: false,
    }, {
        removeEmptyText: true,
    }, {
        removeEmptyContainers: true,
    }, {
        removeViewBox: false,
    }, {
        cleanupEnableBackground: true,
    }, {
        convertStyleToAttrs: true,
    }, {
        convertColors: true,
    }, {
        convertPathData: true,
    }, {
        convertTransform: true,
    }, {
        removeUnknownsAndDefaults: true,
    }, {
        removeNonInheritableGroupAttrs: true,
    }, {
        removeUselessStrokeAndFill: true,
    }, {
        removeUnusedNS: true,
    }, {
        cleanupIDs: true,
    }, {
        cleanupNumericValues: true,
    }, {
        moveGroupAttrsToElems: true,
    }, {
        collapseGroups: true,
    }, {
        removeRasterImages: false,
    }, {
        convertShapeToPath: true,
    }, {
        sortAttrs: true,
    }, {
        removeDimensions: true,
    }],
});
async function importIcons() {
    unicon.setFigmaToken('14954-47328d08-85d2-44f8-922c-5359ad59ebc3');
    const svgs = await unicon.getSvgsFromFigma('VbHlktI0bZAzSFwTzfBwk5d3', {
        page: 'Icons',
        transformSvg(svg) {
            const hexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
            return svg.replace(hexColorRegex, 'currentColor');
        },
    });
    const optimizedSvgs = await Promise.all(Object
        .entries(svgs)
        .map(async ([key, value]) => {
            const optimizedSvg = await svgo.optimize(value, { path: key });
            return {
                name: key
                    .replace('/', '-')
                    .replace(' ', '-')
                    .toLowerCase(),
                data: optimizedSvg.data,
            };
        }));
    optimizedSvgs.forEach((svg) => {
        FS.writeFileSync(`${__dirname}/../svg-icons/${svg.name}.svg`, svg.data, { encoding: 'utf8' });
    });
}
importIcons();
