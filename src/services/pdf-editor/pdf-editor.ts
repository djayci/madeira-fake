import fs from 'fs';
import path from 'path';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

class PDF {
    private _template: ArrayBuffer;
    constructor() {
        this._template = fs.readFileSync(path.resolve(__dirname, "../../../../public/cert_template.pdf"));
    }

    public async process(name: string, medicalId: number) {
        const template = await PDFDocument.load(this._template);
        const font = await template.embedFont(StandardFonts.Helvetica)
        const page = template.getPages()[0];
        const { width, height } = page.getSize();

        page.drawText(medicalId.toString(), {
            x: 45,
            y: height - 317,
            size: 9,
            font: font
        });

        page.drawText(name, {
            x: (width / 2) + 2,
            y: height - 317,
            size: 9,
            font: font
        });

        page.drawText(new Date().toLocaleDateString(), {
            x: (width / 2) + 2,
            y: height - 415,
            size: 9,
            font: font
        })

        return await template.save();
    }
}

export const PDFEditor = new PDF();