import type { NextApiRequest, NextApiResponse } from 'next'
import { PDFEditor } from '../../src/services/pdf-editor/pdf-editor'
import fs from 'fs';
import path from 'path';

type Data = {
  success: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name, medicalId } = JSON.parse(req.body);
  const parsedPdf = await PDFEditor.process(name, medicalId);
  fs.appendFileSync(path.resolve(__dirname, `../../../../public/pdfs/${name}-${medicalId}.pdf`), Buffer.from(parsedPdf));
  res.status(200).json({ success: true });
}
