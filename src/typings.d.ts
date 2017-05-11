/* SystemJS module definition */
declare var module: NodeModule;
declare module 'd3' { let exportAs: any; export = exportAs; }

interface NodeModule {
  id: string;
}

