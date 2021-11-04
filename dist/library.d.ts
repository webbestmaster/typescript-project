export { LibraryComponent as Library } from './library-component/library-component';

declare module 'typescript-project/dist/style.css' {
    type StyleType = Record<string, string>;

    const style: StyleType;

    export default style;
}
