import { useRef } from "react";
import { useForceUpdate, useMount, useUpdateEffect } from "utils-hooks";
import { OptionConfig, OptionsContextState } from "../interface";

type UseOptionsReturn = [
    React.MutableRefObject<OptionConfig[]>,
    React.MutableRefObject<OptionsContextState>,
    (val: any) => OptionConfig | OptionConfig[],
    React.MutableRefObject<Map<any, OptionConfig>>,
];

/**
 * 管理select内声明的option
 * @export
 * @param {boolean} multiple    是否多选
 * @returns UseOptionsReturn
 */
export default function useOptions(multiple: boolean, children?: React.ReactNode): UseOptionsReturn {
    const options = useRef<OptionConfig[]>([]);
    const cacheSelectCfg = useRef(new Map<any, OptionConfig>());
    const optionsContextRef = useRef<OptionsContextState>({ onOptionAdd, onOptionRemove });
    const update = useForceUpdate();
    const lastSelectedCfg = useRef<OptionConfig | OptionConfig[]>(null);

    /**
     * 添加option
     * @param cfg
     */
    function onOptionAdd(cfg: OptionConfig) {
        cacheSelectCfg.current.set(cfg.value, cfg);
        if (!options.current.some((x) => x.value === cfg.value)) {
            options.current.push(cfg);
        }
    }

    /**
     * 移除option
     * @param value
     */
    function onOptionRemove(value: string | number) {
        options.current = options.current.filter((cfg) => cfg.value !== value);
    }

    /**
     * 根据prop获取option配置
     * @param {*} value 值
     * @param {string} [prop='value']
     * @returns {(OptionConfig | OptionConfig[])}
     */
    function getOptionCfg(value: any) {
        if (multiple) {
            const cfgs = [];
            if (!value) {
                return cfgs;
            }
            value.forEach((val) => {
                var cfg = cacheSelectCfg.current.get(val);
                if (cfg) {
                    cfgs.push(cfg);
                }
            });
            return cfgs;
        } else {
            return cacheSelectCfg.current.get(value);
        }
    }

    function _getOptionCfg(value: any) {
        const selectedCfg = getOptionCfg(value);
        lastSelectedCfg.current = selectedCfg;
        return selectedCfg;
    }

    useUpdateEffect(() => {
        if (!lastSelectedCfg.current) {
            // 更新 SelectBox 显示的label
            // 同步最新得options到缓存里
            options.current.forEach((x) => cacheSelectCfg.current.set(x.value, x));
            update();
        }
    }, [children]);

    // Tips: 这里主要是为了初次 options 收集完毕后, 重新渲染SelectInner
    useMount(() => {
        update();
    });

    return [options, optionsContextRef, _getOptionCfg, cacheSelectCfg];
}
