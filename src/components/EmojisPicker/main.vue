<template>
    <el-popover
        :placement="placement"
        trigger="click"
        v-model="visible"
        @show="$emit('show')"
        popper-class="cl-emojis-picker"
    >
        <template slot="reference">
            <slot name="reference" />
        </template>

        <el-tabs v-model="currentTab" type="card" tab-position="bottom">
            <el-tab-pane
                v-for="category in categories"
                :key="category.name"
                :name="category.name"
                lazy
            >
                <i slot="label" :class="category.icon"></i>
                <div class="title el-h3">{{ category.title }}</div>
                <div class="emojis no-scrollbar">
                    <div
                        v-for="emoji in category.emojis"
                        :key="emoji.hexcode"
                        class="emoji clickable"
                        @click="visible = false; $emit('select', emoji)"
                    >
                        {{ emoji.emoji }}
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-popover>
</template>

<script>
import emojis from 'emojibase-data/en/data.json';

export default {
    name: 'ClEmojisPicker',
    data() {
        const categories = [
            {
                name: 'smileys-emotion',
                groups: [0, 1],
                icon: 'el-icon-s-custom',
                title: 'Smileys & emotions',
            },
            {
                name: 'animals-nature',
                groups: [3],
                icon: 'el-icon-sunny',
                title: 'Animals & nature',
            },
            {
                name: 'food-drink',
                groups: [4],
                icon: 'el-icon-apple',
                title: 'Food & drink',
            },
            {
                name: 'travel-places',
                groups: [5],
                icon: 'el-icon-place',
                title: 'Travel & places',
            },
            {
                name: 'activities',
                groups: [6],
                icon: 'el-icon-football',
                title: 'Activities',
            },
            {
                name: 'objects',
                groups: [7],
                icon: 'el-icon-s-opportunity',
                title: 'Objects',
            },
            {
                name: 'symbols',
                groups: [8],
                icon: 'el-icon-magic-stick',
                title: 'Symbols',
            },
            {
                name: 'flags',
                groups: [9],
                icon: 'el-icon-s-flag',
                title: 'Flags',
            },
        ];

        return {
            visible: false,
            currentTab: categories[0].name,
            categories: categories.map(category => ({
                ...category,
                emojis: emojis.filter(emoji => (
                    category.groups.includes(emoji.group) && emoji.version < 12
                        && emoji.order !== 20
                )),
            })),
        };
    },
    props: {
        placement: {
            type: String,
            default: 'bottom-start',
        },
    },
};
</script>

<style lang="scss">
@import '../../styles/index.scss';

.cl-emojis-picker {
    padding: 0px;
    z-index: 2028 !important;
    .el-tabs {
        .el-tabs__content {
            .title {
                padding: 10px;
                color: $color_grey;
            }
            .emojis {
                display: flex;
                flex-wrap: wrap;
                width: 250px;
                height: 250px;
                overflow-y: auto;
                .emoji {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .el-tabs__header {
            background-color: #f2f4f5;
            .el-tabs__nav {
                display: flex;
                width: 100%;
                border: none;
                height: 45px;
                padding: 0px 10px;
                .el-tabs__item {
                    flex: 1 0;
                    border: none;
                    padding: 0px;
                }
            }
        }
    }
}
</style>
