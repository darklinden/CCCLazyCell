import { ScrollViewCellX } from "./ScrollViewCellX";

const { ccclass, property } = cc._decorator;

@ccclass
export class Test extends cc.Component {

    public a0BtnClicked(t: cc.Toggle) {
        const wtf = this.node.getComponentsInChildren(ScrollViewCellX);
        for (const i in wtf) {
            const one = wtf[i];
            one.enabled = t.isChecked;
            one.mainNode.active = true;
        }
    }
}
