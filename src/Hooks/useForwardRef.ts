import { useEffect } from "react";

export function useForwardRef(refs: React.MutableRefObject<any>[], forwardRefs: React.MutableRefObject<any>[]) {
    useEffect(() => {
        forwardRefs.forEach((x, i) => {
            if (x && refs[i].current) {
                x.current = refs[i].current;
            }
        });
    }, refs.map((x) => x.current));
}
