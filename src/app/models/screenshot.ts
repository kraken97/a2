export class Screenshot {

    constructor(
        public id: number,
        public order: number,
        public name: string,
        public imageUrl: string,
        public visible: boolean,
        public screenshotMetadataId: number,
        public date: any,
        public designSlideId?: number,
        public workId?: number) {
    }

}
