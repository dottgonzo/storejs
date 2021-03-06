// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/5576e902151dc027bcf308728a46817a7ee4248c/deep-diff/deep-diff.d.ts
// Type definitions for deep-diff
// Project: https://github.com/flitbit/diff/
// Definitions by: ZauberNerd <https://github.com/ZauberNerd/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module deepDiff {
    interface IDiff {
        kind: string;
        path: string[];
        lhs: any;
        rhs: any;
        index?: number;
        item?: IDiff;
    }

    interface IAccumulator {
        push(diff: IDiff): void;
        length: number;
    }

    interface IPrefilter {
        (path: string[], key: string): boolean;
    }

    interface IDeepDiff {
        diff(): IDiff;
        diff(lhs: Object, rhs: Object, prefilter?: IPrefilter, acc?: IAccumulator): IDiff[];
        observableDiff(lhs: Object, rhs: Object, changes: Function, prefilter?: IPrefilter, path?: string[], key?: string, stack?: Object[]): void;
        applyDiff(target: Object, source: Object, filter: Function): void;
        applyChange(target: Object, source: Object, change: IDiff): void;
        revertChange(target: Object, source: Object, change: IDiff): void;
        isConflict(): boolean;
        noConflict(): IDeepDiff;
    }
}

declare var DeepDiff: deepDiff.IDeepDiff;

declare module "deep-diff" {
    var diff: deepDiff.IDeepDiff;
    export = diff;
}