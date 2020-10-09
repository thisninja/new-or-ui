<template>
    <div :class="{'readonly' : readonly, 'invalid' : invalid, 'active' : active}" class="or-text-expression">
        text-expression local
        <!-- SVG ICONS CONTAINER -->
        <svg
            class="svg-icon-holder"
            width="24px"
            height="14px"
            viewBox="0 0 24 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <defs
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
            >
                <g id="varIcon" fill="inherit">
                    <path
                        id="{x}"
                        d="M3.63347002,7.08106937 L3.63347002,6.95804652 C4.60398359,6.86919669 5.05506736,6.33609769 5.05506736,5.33824571 L5.05506736,3.7184449 C5.05506736,2.64541229 5.40363209,2.31735137 6.51767231,2.31735137 L6.82522943,2.31735137 L6.82522943,0.813738797 L6.10759616,0.813738797 C4.02304237,0.813738797 3.14821324,1.56554508 3.14821324,3.38354937 L3.14821324,4.64795085 C3.14821324,5.71414885 2.86115993,6.06954819 2,6.06954819 L2,7.96273311 C2.86115993,7.96273311 3.14821324,8.31813244 3.14821324,9.37749584 L3.14821324,10.8674392 C3.14821324,12.7264511 4.02987697,13.4987612 6.10759616,13.4987612 L6.82522943,13.4987612 L6.82522943,12.0019832 L6.51767231,12.0019832 C5.41046669,12.0019832 5.05506736,11.6739223 5.05506736,10.6077243 L5.05506736,8.83072763 C5.05506736,7.78503344 4.56297597,7.16991921 3.63347002,7.08106937 Z M12.0205038,8.7282086 L13.4215973,11.1886655 L15.6360086,11.1886655 L13.2507323,7.37495728 L15.6155048,3.65009887 L13.4421011,3.65009887 L12.1093536,6.12422501 L11.9863308,6.12422501 L10.6535833,3.65009887 L8.37082602,3.65009887 L10.7492677,7.46380712 L8.38449523,11.1886655 L10.4963874,11.1886655 L11.897481,8.7282086 L12.0205038,8.7282086 Z M20.36653,7.08106937 C19.437024,7.16991921 18.9449326,7.78503344 18.9449326,8.83072763 L18.9449326,10.6077243 C18.9449326,11.6739223 18.5895333,12.0019832 17.4823277,12.0019832 L17.1747706,12.0019832 L17.1747706,13.4987612 L17.8924038,13.4987612 C19.970123,13.4987612 20.8517868,12.7264511 20.8517868,10.8674392 L20.8517868,9.37749584 C20.8517868,8.31813244 21.1388401,7.96273311 22,7.96273311 L22,6.06954819 C21.1388401,6.06954819 20.8517868,5.71414885 20.8517868,4.64795085 L20.8517868,3.38354937 C20.8517868,1.56554508 19.9769576,0.813738797 17.8924038,0.813738797 L17.1747706,0.813738797 L17.1747706,2.31735137 L17.4823277,2.31735137 C18.5963679,2.31735137 18.9449326,2.64541229 18.9449326,3.7184449 L18.9449326,5.33824571 C18.9449326,6.33609769 19.3960164,6.86919669 20.36653,6.95804652 L20.36653,7.08106937 Z"
                    />
                </g>
            </defs>
        </svg>

        <svg
            class="svg-icon-holder"
            width="24px"
            height="14px"
            viewBox="0 0 24 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <defs
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
            >
                <g id="jsIcon" fill="inherit">
                    <path
                        id="&lt;/&gt;"
                        d="M7.30008574,9.06932409 L2.74549302,6.96880416 L2.74549302,6.83708839 L7.30008574,4.73656846 L7.30008574,2.64991334 L0.693499949,6.08838821 L0.693499949,7.71750433 L7.30008574,11.1559792 L7.30008574,9.06932409 Z M11.5575752,13 L14.469187,1 L12.5697069,1 L9.69968961,13 L11.5575752,13 Z M16.8687909,9.06932409 L16.8687909,11.1559792 L23.4753767,7.71750433 L23.4753767,6.08838821 L16.8687909,2.64991334 L16.8687909,4.73656846 L21.4233836,6.83708839 L21.4233836,6.96880416 L16.8687909,9.06932409 Z"
                    />
                </g>
            </defs>
        </svg>
        <!-- SVG ICONS CONTAINER END -->

        <div class="header">
            <div class="label">
                <div class="label-wrapper">
                    label
                    <!-- {{label}} -->
                </div>
            </div>
            <a-button icon="search"> pink </a-button>
        </div>
        <div class="input-wrapper">
            <div
                ref="contenteditable"
                v-html="expression"
                @blur="onEdit"
                contenteditable
                class="editable"
            />
        </div>
    <!-- <div v-if="helpText && !invalid" class="help-text">{{helpText}}</div>
        <div v-if="invalid" class="error-text">{{error}}</div> -->
    </div>
</template>

<script>
export default {
    name: 'OrTextExpression',
    // props: {
    //   label: {
    //     type: String,
    //     default: ''
    //   }
    // },
    data() {
        return {
            expression: '',
            readonly: false,
            invalid: false,
            active: false,
        };
    },
    computed: {
        displayTextInput() {
            return true;
        },
    },
    methods: {
        onEdit(evt) {
            const src = evt.target.innerHTML;
            this.txt = src;
        },
    /**
         * Handle dataOut variable insertion
         * @param {Object} dataOut is an Object of selected step
         */
    // selectDataOut (dataOut) {
    //   this.$refs.code.insertCode({ code: this.convertMergeTagToCode(dataOut.variableName) });
    //   this.$refs.dataOutPopover.close();
    // },
    // addMergeTag (tag) {
    //   if (this.displayTextInput) {
    //     this.$refs.editable.insertAndFocusMergeTagAtSelection(tag, !tag);
    //   } else if (tag) {
    //     this.selectDataOut({ variableName: tag });
    //   } else {
    //     this.openDataOutPopover();
    //   }
    // }
    },
};
</script>
