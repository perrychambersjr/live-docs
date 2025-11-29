export type FunctionItem = {
    type: 'function';
    name: string;
    params: string | null;
    return: string;
    comment?: string | undefined;
};

export type ClassItem = {
    type: 'class';
    name: string;
    comment?: string | undefined;
};


