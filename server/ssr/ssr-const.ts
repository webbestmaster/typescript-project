import fileSystem from 'fs';

export const contentStringBegin = '<div class="js-app-wrapper">';
export const contentStringEnd = '</div>';
export const contentStringFull = contentStringBegin + contentStringEnd;

// eslint-disable-next-line no-sync
export const indexHtml: string = fileSystem.readFileSync('./dist/index.html', 'utf8');
// eslint-disable-next-line no-sync
export const indexHtmlError500: string = fileSystem.readFileSync('./dist/index-500.html', 'utf8');
