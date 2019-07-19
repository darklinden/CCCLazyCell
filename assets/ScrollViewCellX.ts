const { ccclass, property } = cc._decorator;

@ccclass
export class ScrollViewCellX extends cc.Component {

    @property({ type: cc.Node, visible: true })
    private _main: cc.Node = null;

    @property({ visible: true })
    private _detectDelay: number = 0.2;

    public get mainNode() {
        return this._main;
    }

    onEnable() {
        CC_DEBUG && cc.log('ScrollViewCellX.onEnable');
        this.schedule(this.updateCell, this._detectDelay, cc.macro.REPEAT_FOREVER);
    }

    onDisable() {
        CC_DEBUG && cc.log('ScrollViewCellX.onDisable');
        this.unschedule(this.updateCell);
    }

    private _parentMask: cc.Node = null;
    private parentMask() {
        if (!this._parentMask) {
            let p = this.node.parent;
            while (p) {
                if (p.scale !== 1) CC_DEBUG && cc.error('ScrollViewCellX.parentMask ' + p.name + ' scale is not 1!');
                if (p.getComponent(cc.Mask)) {
                    break;
                }
                p = p.parent;
            }
            this._parentMask = p;
        }
        return this._parentMask;
    }

    updateCell(dt: number) {
        const m = this.parentMask();
        let maskRect = m.getBoundingBox();
        maskRect.center = m.parent.convertToWorldSpaceAR(maskRect.center);

        const contentRect = this.node.getBoundingBoxToWorld();
        if (maskRect.intersects(contentRect)) {
            if (!this._main.active) {
                CC_DEBUG && cc.log('ScrollViewCellX.updateCell show ' + this.node.name);
                this._main.active = true;
            }
        }
        else {
            if (this._main.active) {
                CC_DEBUG && cc.log('ScrollViewCellX.updateCell hide ' + this.node.name);
                this._main.active = false;
            }
        }
    }
}
