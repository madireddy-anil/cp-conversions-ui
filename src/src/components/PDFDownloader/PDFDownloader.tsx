import * as React from 'react'
import moment from 'moment'
import jsPDF from 'jspdf'
import { Card } from 'antd'
import { Colors, Text } from '@payconstruct/design-system'
import { openSansBoldFont } from '../Fonts/OpenSans/OpenSans-Bold'
import { openSansRegularFont } from '../Fonts/OpenSans/OpenSans-Regular-normal'
import { neuewHassRegularFont } from '../Fonts/NeueHass/Neue-Haas-Regular'
import logo from '../../../public/orbital.png'
import './PDFDownloader.css'
import { IssuerEntityAddressEnum, IssuerEntityIdsEnum } from 'pages/Conversions/enums'

interface PaymentObj {
  title: string
  details: { [key: string]: string | undefined }
}

interface IDownloaderProps {
  issuerEntity: string
  summary: PaymentObj[]
  startDownload: boolean
  onCompleteDownload: () => void
  fileName: string
}

const Downloader: React.FC<IDownloaderProps> = ({
  issuerEntity,
  summary,
  startDownload,
  onCompleteDownload,
  fileName,
}) => {
  React.useEffect(() => {
    if (startDownload) {
      generate()
    }
  }, [startDownload])

  let base64Img: string | null = null
  const pdf = new jsPDF('p', 'pt', 'a4')

  const margins = [80, 0, 55, 15] // [0] top, [1] right, [2] bottom, [3] left
  const pdfWidth = 560
  const emptySymbol = '---'

  const imgToBase64 = (url: string, callback: (v: string | null) => void, imgconstiable?: string) => {
    if (!window.FileReader) {
      callback(null)
      return
    }
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        imgconstiable = typeof reader?.result === 'string' ? reader?.result?.replace('text/xml', 'image/jpeg') : ''
        imgconstiable && callback(imgconstiable)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', url)
    xhr.send()
  }

  const generate = () => {
    imgToBase64(logo, function (base64: string | null) {
      base64Img = base64
    })

    const elem = (document.getElementById('account-details') as HTMLInputElement) || null
    if (elem) {
      elem.style.display = 'block'
    }

    pdf.addFileToVFS('neuewHassRegular.ttf', neuewHassRegularFont)
    pdf.addFont('neuewHassRegular.ttf', 'Neue Haas', 'normal')
    pdf.setFont('Neue Haas')

    pdf.html(elem, {
      callback: () => {
        headerFooterFormatting(pdf, pdf.getNumberOfPages())
        onCompleteDownload()
        pdf.save(fileName)
        elem.style.display = 'none'
      },
      autoPaging: 'text',
      width: pdfWidth,
      margin: margins,
    })
  }

  function headerFooterFormatting(doc: jsPDF, totalPages: number) {
    for (let i = totalPages; i >= 1; i--) {
      // create necessary pdf page
      doc.setPage(i)

      //header
      header(doc)

      //footer
      footer(doc, i, totalPages)
      // doc.page++;
    }
  }

  const header = (doc: jsPDF) => {
    // logo
    if (base64Img) {
      doc.addImage(base64Img, 'JPEG', margins[3], 10, 100, 24)
    }
    // Address below the logo
    doc.setFontSize(10)
    doc.setTextColor(138, 146, 157)
    doc.text(
      issuerEntity === IssuerEntityIdsEnum.PayPerformLtd
        ? IssuerEntityAddressEnum.PayPerformLtd
        : IssuerEntityAddressEnum.PayPerformOU ?? emptySymbol,
      margins[3],
      50
    )

    //righ side content
    doc.addFileToVFS('OpenSansBold.ttf', openSansBoldFont)
    doc.addFileToVFS('OpenSansNormal.ttf', openSansRegularFont)

    doc.addFont('OpenSansBold.ttf', 'OpenSansBold', 'Bold')
    doc.setFont('OpenSansBold', 'Bold')

    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    const statement = 'Orbital Platform Payment'
    doc.text(statement, doc.internal.pageSize.width - 15, 20, {
      align: 'right',
    })

    doc.addFont('OpenSansNormal.ttf', 'OpenSansNormal', 'normal')
    doc.setFont('OpenSansNormal', 'normal')

    const statementDate = 'Payment details: ' + moment().format('DD MMM YYYY')

    doc.setFontSize(10)
    doc.setTextColor(138, 146, 157)
    doc.text(statementDate, doc.internal.pageSize.width - 15, 40, {
      align: 'right',
      lineHeightFactor: 1.5,
    })

    // horizondal line
    doc.setDrawColor(138, 146, 157) // #8a929d
    doc.line(0, margins[0] - 15, doc.internal.pageSize.width, margins[0] - 15)
  }

  const getFooterText = () => {
    /* Pay Perform Ltd Address */
    if (issuerEntity === IssuerEntityIdsEnum.PayPerformLtd) {
      return `Orbital is a trading name of Pay Perform Limited, Financial Conduct Authority authorised payment institution, company number: 10789721, registered address: 230 Blackfriars Rd, London SE1 8NW, United Kingdom.`
    }

    /* Pay Perform OU Address */
    if (issuerEntity === IssuerEntityIdsEnum.PayPerformOU) {
      return `Orbital is a trading name of Pay Perform OÜ, licensed virtual currency service provider authorised by Republic of Estonia Financial Intelligence Unit, company number: 14760418, registered address: Harju maakond, Tallinn, Kristiine linnaosa, Keemia tn 4, 10616.`
    }
    return `Orbital is a trading name of Pay Perform Limited, Financial Conduct Authority authorised payment institution, company number: 10789721, registered address: 230 Blackfriars Rd, London SE1 8NW, United Kingdom.`
  }

  const footer = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    const str = totalPages > 1 ? 'Page ' + pageNumber + ' of ' + totalPages : ''
    const footerText = getFooterText()
    doc.setFontSize(8)
    doc.setTextColor(138, 146, 157)

    //page numbers
    doc.text(str, doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 40)

    // horizondal line
    doc.setDrawColor(138, 146, 157) // #8a929d
    doc.line(0, doc.internal.pageSize.height - 35, doc.internal.pageSize.width, doc.internal.pageSize.height - 35)

    // footer text
    doc.text(footerText, margins[3], doc.internal.pageSize.height - 20, {
      baseline: 'bottom',
      maxWidth: pdfWidth,
      lineHeightFactor: 1.5,
    })
  }

  const getPaymentDetails = () => {
    return summary.map((obj: PaymentObj) => {
      return (
        <Card
          key={obj.title}
          className={'card-wrapper'}
          style={{
            borderRadius: '5px',
            padding: '0px',
            marginBottom: '15px',
          }}
          bodyStyle={{ padding: '15px' }}
        >
          <p style={{ fontSize: '14px', fontWeight: 'bolder' }}>{obj.title}</p>
          {Object.entries(obj.details).map(([key, value]) => {
            return value && <ListItem key={key} name={key} value={value ? value : ''} />
          })}
        </Card>
      )
    })
  }

  // interface ListOfDetailsProps {
  //   title?: string;
  //   items: string[];
  // }
  // const ListOfDetails: React.FC<ListOfDetailsProps> = ({
  //   title = "How to use these details",
  //   items
  // }) => {
  //   return (
  //     <div>
  //       <Text weight="bold" size="xxsmall">
  //         {title}
  //       </Text>
  //       {items.map((item) => {
  //         if (item.length < 1) return null;
  //         return (
  //           <li key={item}>
  //             <Text size="xxsmall">{item}</Text>
  //           </li>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  // /**
  //  *
  //  * @function getFiatFooters
  //  *
  //  *    create custom footer for local / cross border payment
  //  *
  //  *  @param type
  //  *
  //  *  @returns null
  //  *
  //  *
  //  */
  // const getFiatFooters = (type: string) => {
  //   const isIntermediary = false;
  //   const currency: any = "GBP";
  //   // const isIntermediary = Boolean(accountIdentification?.intermediaryBank);
  //   const intermediaryArray = isIntermediary
  //     ? [
  //         "To ensure arrival of your funds, please provide the details of the intermediary."
  //       ]
  //     : [];
  //   switch (currency) {
  //     case "GBP":
  //       if (type === "local") {
  //         return (
  //           <ListOfDetails
  //             items={[
  //               "Use these details to receive GBP from bank accounts inside the UK.",
  //               "Transfers typically take a few seconds to appear on your account, although some may take a few hours."
  //             ]}
  //           />
  //         );
  //       } else {
  //         return (
  //           <ListOfDetails
  //             items={[
  //               "Use these details to receive GBP from bank accounts outside the UK.",
  //               "Transfers typically take 2 working days to appear on your account, although some may take up to 5 working days.",
  //               ...intermediaryArray
  //             ]}
  //           />
  //         );
  //       }
  //     case "EUR":
  //       if (type === "local") {
  //         return (
  //           <ListOfDetails
  //             items={[
  //               "Use these details to receive EUR from bank accounts within the SEPA region.",
  //               "Transfers typically take a few hours to appear on your account."
  //             ]}
  //           />
  //         );
  //       } else {
  //         return (
  //           <ListOfDetails
  //             items={[
  //               "Use these details to receive EUR from bank accounts outside the SEPA region.",
  //               "Transfers typically take 2 working days to appear on your account, although some may take up to 5 working days.",
  //               ...intermediaryArray
  //             ]}
  //           />
  //         );
  //       }
  //     case "USD":
  //       if (type === "local") {
  //         return (
  //           <ListOfDetails
  //             items={[
  //               "Use these details to receive USD from bank accounts within the US.",
  //               "Transfers typically take a few hours to appear on your account."
  //             ]}
  //           />
  //         );
  //       } else {
  //         return (
  //           <ListOfDetails
  //             items={[
  //               "Use these details to receive USD from bank accounts outside of the US.",
  //               "Transfers typically take 2 working days to appear on your account, although some may take up to 5 working days.",
  //               ...intermediaryArray
  //             ]}
  //           />
  //         );
  //       }
  //   }
  // };

  /**
   *
   * @function getFooter
   *
   *  Footer for crypto and ledger accounts
   *
   *  @param type
   *
   *  @returns null
   */
  // const getFooter = (type?: string) => {
  //   return (
  //     <>
  //       {type === "crypto" ? (
  //         <ListOfDetails
  //           items={[
  //             "This is your unique crypto deposit address.",
  //             "Transfer usually take a few seconds to appear on your account, although some may take a few hours."
  //           ]}
  //         />
  //       ) : (
  //         <ListOfDetails
  //           items={[
  //             "This account is not addressable from external banks.",
  //             "To transfer to this account, move funds from one of your other Orbital accounts."
  //           ]}
  //         />
  //       )}
  //     </>
  //   );
  // };

  interface ListItemProps {
    name: string
    value: string
  }

  const ListItem: React.FC<ListItemProps> = ({ name, value }) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          lineHeight: '1.2rem',
          marginTop: 15,
          wordBreak: 'break-word',
        }}
      >
        <Text size="small" style={{ width: '40%' }} color={Colors.grey.neutral500}>
          {name}
        </Text>
        <Text size="small" style={{ width: '60%', textAlign: 'right' }} color={Colors.grey.neutral700}>
          {value ? value : '--'}
        </Text>
      </div>
    )
  }

  return (
    <div id="account-details" style={{ width: '595px' }}>
      {getPaymentDetails()}
    </div>
  )
}

export default Downloader
