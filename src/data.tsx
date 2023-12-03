export interface MarkdownBlock {
    type: 'markdown',
    content: string
}

export interface WordRecordingBlock {
    type: 'wordRecording',
    url: string,
    chinese: [string],
    pinyin: [string],
    english: string,
    englishLiteral: string
}

export interface ImageBlock {
    type: 'image',
    url: string,
    alt: string
}

export interface Page {
    title: string,
    author: string,
    time: number,
    content: [MarkdownBlock | WordRecordingBlock | ImageBlock]
}

export interface PageRef {
    title: string
}
