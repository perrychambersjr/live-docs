type FunctionItem = {
    type: 'function';
    name: string;
    params: string | null;
    return: string;
    comment?: string;
};

type ClassItem = {
    type: 'class';
    name: string;
    comment?: string;
};

export type Item = FunctionItem | ClassItem;

