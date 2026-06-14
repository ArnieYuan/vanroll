declare global {
    interface Document {
        modelContext?: {
            registerTool(tool: {
                name: string;
                description: string;
                inputSchema: object;
                execute: (params: any) => Promise<string> | string;
            }): void;
        };
    }
}
export declare function registerWebMCP(): void;
