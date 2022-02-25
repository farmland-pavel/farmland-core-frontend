declare global {
  interface Window {
    __store__: () => void;
  }
}

declare namespace JSX {
  interface ElementChildrenAttribute {
    children: React.ReactNode;
    testId: string;
  }
  interface IntrinsicElements {
    [elemName: string]: {
      testId?: string
    };
  }
}
