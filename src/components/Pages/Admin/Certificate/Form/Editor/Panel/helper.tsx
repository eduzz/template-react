export default function generateOutputHTML(body: string): string {
  return `
  <html>
        <head>
            <meta charset='utf-8'>
            <link href='https://fonts.googleapis.com/css?family=Allura' rel='stylesheet'>
            <style>
                @page {
                    size: A4 landscape;
                    margin:0;
                }

                html, body {
                    margin: 0;
                    padding: 0;
                    width: 3508px;
                    height: 2479px;
                    overflow: hidden;
                }

                body {
                    zoom: 0.48;
                }

                img {
                  position: absolute;
                }
            </style>
        </head>
        <body>
          ${body}
        </body>
      </html>
      `;
}