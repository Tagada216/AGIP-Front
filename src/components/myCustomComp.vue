<template>
  <div class="__array-tabs-form-item">
    <el-tabs
      type="card"
      :tab-position="mergeConfig.tabPosition"
      @edit="handleTabsEdit"
      v-model="activeName"
    >
      <!-- v-for="(dataItem, idx) in schema.value" -->
      <el-tab-pane
        v-for="item in optionsData"
        :key="String(item[mergeConfig.itemValueField])"
        :name="item[mergeConfig.itemValueField]"
      >
        <span slot="label">{{item[mergeConfig.itemLabelField]}}</span>

        <!-- array item 是 正常的 object 类型 -->
        <template v-if="isNormalObjSchema(dataItem.__dataSchema)">
          <ncform-object
            :schema="dataItem.__dataSchema"
            :form-data="formData"
            :idx-chain="(idxChain ? idxChain + ',' : '') + idx"
            :config="dataItem.__dataSchema.ui.widgetConfig"
            :show-legend="false"
          >
            <template
              v-for="(fieldSchema, fieldName) in (dataItem.__dataSchema.properties || {__notObjItem: dataItem.__dataSchema})"
              :slot="fieldName"
            >
              <!-- 注意：__notObjItem 这个Key为与form-item约定好的值，其它名字不生效 -->
              <slot :name="fieldName" :schema="fieldSchema" :idx="idx"></slot>
            </template>
          </ncform-object>
        </template>

        <!-- array item 是 非正常的 object 类型 以及 其它类型 -->
        <!-- <template v-else>
        <slot name="__notObjItem" :schema="dataItem.__dataSchema" :idx="idx"></slot>-->
        <!-- 注意：__notObjItem 和 __dataSchema 都是约定好的值，其它名字不生效 -->
        <!-- </template> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
.__array-tabs-form-item {
    .el-tabs {
        margin-top: 6px;
        &.el-tabs--left {
            .el-tabs__new-tab {
                margin-left: 0;
                .el-icon-plus {
                    width: 100%;
                }
            }
        }
    }

    .el-tab-pane > .__object-form-item > .el-row {
        border: none;
        margin-top: -8px;
    }
    .el-tabs__header {
        margin: 0 0 8px;
    }
}
</style>

<script>
import _get from 'lodash-es/get';
import _cloneDeep from 'lodash-es/cloneDeep';
import ncformCommon from '@ncform/ncform-common';

const layoutArrayMixin = ncformCommon.mixins.vue.layoutArrayMixin;

export default {
    mixins: [layoutArrayMixin],

    i18nData: {
        en: {
            delItemTips: 'Are you sure to delete this item?',
        },
        zh_cn: {
            delItemTips: '确定要删除该项吗？',
        },
    },

    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: '',
        },
    },

    created() {
        //this.$data.itemTemplate.template = this.mergeConfig.itemTemplate;
        this._getDataSource();
    },

    computed: {
        // disabled / readonly / hidden / placeholder 你可以直接使用这些变量来控制组件的行为
        optionsData() {
            return this.$data.isLocalSource &&
                this.mergeConfig.enumSource.length > 0
                ? this.mergeConfig.enumSource
                : this.$data.options;
        },
    },

    data() {
        return {
            activeName: '0',
            defaultConfig: {
                tabPosition: 'top',
            },
            isLocalSource: true,
            options: [],
            itemTemplate: {
                template: '',
                props: ['item'],
            },

            loading: false,
        };
    },

    methods: {
        remoteMethod(query) {
            if (!_get(this.mergeConfig, 'enumSourceRemote.remoteUrl')) {
                return;
            }

            const options = {
                url: this.mergeConfig.enumSourceRemote.remoteUrl,
                params: _cloneDeep(
                    _get(this.mergeConfig, 'enumSourceRemote.otherParams', {})
                ),
            };
            if (this.mergeConfig.enumSourceRemote.paramName)
                options.params[
                    this.mergeConfig.enumSourceRemote.paramName
                ] = query;
            this.$http(options).then(res => {
                this.$data.options = this.mergeConfig.enumSourceRemote.resField
                    ? _get(res.data, this.mergeConfig.enumSourceRemote.resField)
                    : res.data;
                if (
                    this.mergeConfig.enumSourceRemote.selectFirstItem &&
                    this.$data.options.length > 0
                ) {
                    this.$data.modelVal =
                        this.$data.modelVal ||
                        this.$data.options[0][this.mergeConfig.itemValueField];
                }

                this._keepSelectedItem();
            });
        },
        handleTabsEdit(targetName, action) {
            if (action === 'add') {
                this.addItem();
                this.$data.activeName = this.schema.value.length - 1 + '';
            }
        },
        _getDataSource() {
            if (_get(this.mergeConfig, 'enumSourceRemote.remoteUrl')) {
                this.$data.isLocalSource = false;
                this.remoteMethod();
            } else {
                if (this.mergeConfig.enumSource.length == 0) {
                    if (ncformUtils.getValType(this.value) == 'boolean') {
                        this.$data.options = [
                            {
                                value: 1,
                                label: 'true',
                            },
                            {
                                value: 0,
                                label: 'false',
                            },
                        ];
                        this._keepSelectedItem();
                    }
                } else {
                    this.$data.options = this.mergeConfig.enumSource;
                    this._keepSelectedItem();
                }
            }
        },
        handleChange() {
            this._keepSelectedItem();
        },

        _keepSelectedItem() {
            if (this.mergeConfig.itemDataKey) {
                let selectedModelVal = Array.isArray(this.$data.modelVal)
                    ? this.optionsData.filter(
                          item =>
                              this.$data.modelVal.indexOf(
                                  item[this.mergeConfig.itemValueField]
                              ) >= 0
                      )
                    : this.optionsData.find(
                          item =>
                              item[this.mergeConfig.itemValueField] ===
                              this.$data.modelVal
                      );
                this._setTempData(
                    this.mergeConfig.itemDataKey,
                    selectedModelVal
                );
            }
        },
    },
};
</script>
