import { OptionConfig } from "@/interface";
import { useRef, useState, useEffect } from "react";
import { useMount } from "utils-hooks";

type UseOptionsReturn = [React.MutableRefObject<OptionConfig[]>, (cfg: OptionConfig) => void, (value: string | number) => void, (val: any) => OptionConfig | OptionConfig[], React.MutableRefObject<Map<any, OptionConfig>>];

/**
 * 管理select内声明的option
 * @export
 * @param {boolean} multiple    是否多选
 * @returns UseOptionsReturn
 */
export default function useOptions(multiple: boolean): UseOptionsReturn {
    const options = useRef<OptionConfig[]>([]);
    const initRef = useRef(false);
    const [_, updateSelectedCfg] = useState(0);
    const cacheSelectCfg = useRef(new Map<any, OptionConfig>());

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
    function getOptionCfg(value: any, prop: string = "value"): OptionConfig | OptionConfig[] {
        if (multiple) {
            const cfgs = [];
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

    // Tips: 这里主要是为了初次 options 收集完毕后, 重新渲染SelectInner
    useMount(() => {
        initRef.current = true;
        updateSelectedCfg(1);
    });

    return [options, onOptionAdd, onOptionRemove, getOptionCfg, cacheSelectCfg];
}
