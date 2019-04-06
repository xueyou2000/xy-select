import { OptionConfig } from "@/interface";
import { useRef, useState } from "react";
import { useMount } from "utils-hooks";
// import shallowequal from "shallowequal";

/**
 * 管理option配置集合
 */
export function useOptionCollect(value: any, multiple: boolean): [React.MutableRefObject<OptionConfig[]>, (value: string | number, label: string, disabled: boolean) => void, (value: string | number) => void, OptionConfig | OptionConfig[]] {
    const options = useRef<OptionConfig[]>([]);
    const initRef = useRef(false);
    const [_, updateSelectedCfg] = useState(0);

    /**
     * 添加option配置
     * @param value
     * @param label
     * @param disabled
     */
    function onOptionAdd(value: string | number, label: string, disabled: boolean) {
        options.current.push({ value, label, disabled });
    }

    /**
     * 移除option配置
     * @param value
     */
    function onOptionRemove(value: string | number) {
        options.current = options.current.filter((cfg) => cfg.value !== value);
    }

    // function update() {
    //     const cfgs = getSelectedCfg();
    //     if (!shallowequal(selectedCfg, cfgs)) {
    //         updateSelectedCfg(cfgs);
    //     }
    // }

    /**
     * 根据当前选中value, 获取对应option配置
     */
    function getSelectedCfg(): OptionConfig | OptionConfig[] {
        if (multiple) {
            const cfgs = [];
            value.forEach((val) => {
                var cfg = options.current.find((cfg) => cfg.value === val);
                if (cfg) {
                    cfgs.push(cfg);
                }
            });
            return cfgs;
        } else {
            return options.current.find((x) => x.value === value);
        }
    }

    // Tips: 这里主要是为了初次 options 收集完毕后, 重新渲染SelectInner
    useMount(() => {
        initRef.current = true;
        updateSelectedCfg(1);
    });

    return [options, onOptionAdd, onOptionRemove, getSelectedCfg()];
}
