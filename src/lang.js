import frenchkiss from 'frenchkiss';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

frenchkiss.locale('en');

frenchkiss.set('en', {
    on: 'On',
    off: 'Off',
});

locale.use(lang);
