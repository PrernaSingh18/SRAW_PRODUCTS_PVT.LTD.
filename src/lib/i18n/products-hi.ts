import type { Locale } from "./config";
import type { Product } from "@/lib/products";

type ProductCopy = {
  tagline: string;
  description: string;
  notes: string[];
  burnTime: string;
};

const hiCopy: Record<string, ProductCopy> = {
  gulaab: {
    tagline: "भोर में चुने गुलाब की ताज़ा पंखुड़ियाँ।",
    description:
      "बाँस की सींक पर प्राकृतिक गुलाब अर्क और हलमद्दी से बनी कोमल अगरबत्ती। गुलाब की यह महक कमरे में सुबह की पूजा के बाद वाले मंदिर प्रांगण जैसी शांति भर देती है।",
    notes: ["गुलाब अर्क", "हलमद्दी राल", "मधु मोम"],
    burnTime: "प्रति बत्ती 30–35 मिनट",
  },
  chandan: {
    tagline: "रोज़ की पूजा के लिए गर्म चंदन।",
    description:
      "हमारी सबसे पारंपरिक सुगंध। मलाईदार चंदन चूर्ण और काष्ठ तेलों का मेल चंदन को स्थिर, मन को थामने वाला धुआँ देता है — वही महक जिसके साथ भारतीय घर बड़े हुए हैं।",
    notes: ["चंदन", "देवदार", "खस"],
    burnTime: "प्रति बत्ती 32–38 मिनट",
  },
  lavender: {
    tagline: "शांत शामें और गहरी साँसें।",
    description:
      "आराम के लिए आधुनिक पुष्प सुगंध। लैवेंडर तेल हल्के काष्ठ आधार पर रखा गया है ताकि धुआँ साफ़ रहे और कभी तीखा न लगे — शयनकक्ष और ध्यान कोने के लिए उपयुक्त।",
    notes: ["लैवेंडर तेल", "श्वेत कस्तूरी", "बाँस"],
    burnTime: "प्रति बत्ती 28–32 मिनट",
  },
  mogra: {
    tagline: "रात में खिलती चमेली, डिब्बे में बंद।",
    description:
      "हरी ताज़गी के संकेत के साथ गाढ़ी चमेली सुगंध। मोगरा त्योहारों की शामों, गजरों और पारिवारिक मिलन की महक है।",
    notes: ["चमेली", "हरी पत्ती", "अंबर"],
    burnTime: "प्रति बत्ती 30–35 मिनट",
  },
  neelkanth: {
    tagline: "राल और जड़ी-बूटियों का मंदिर मिश्रण।",
    description:
      "नीलकंठ के नाम पर। गुग्गुल, लोबान और वन जड़ी-बूटियाँ हाथ से मिलाई जाती हैं, जिससे आरती और हवन के लिए गहरी, धूमिल भक्तिमय सुगंध बनती है।",
    notes: ["गुग्गुल", "लोबान", "वन जड़ी-बूटियाँ"],
    burnTime: "प्रति बत्ती 35–40 मिनट",
  },
  "black-premium-3-in-1": {
    tagline: "तीन ख़ास सुगंध, एक डिब्बे में।",
    description:
      "हमारी प्रीमियम कोयला-रहित काली बत्तियाँ गुलाब, चंदन और मोगरा को एक ही पैक में लाती हैं, ताकि आप दिन के मूड के अनुसार सुगंध चुन सकें।",
    notes: ["गुलाब", "चंदन", "मोगरा"],
    burnTime: "प्रति बत्ती 34–40 मिनट",
  },
  "srikanth-3-in-1": {
    tagline: "घर की पसंदीदा, किफ़ायती पैक में।",
    description:
      "क्लासिक श्रीकंठ तिकड़ी — उन घरों के लिए संतुलित रोज़मर्रा का मिश्रण जहाँ सुबह और शाम दोनों समय अगरबत्ती जलती है।",
    notes: ["पुष्प", "काष्ठ", "हर्बल"],
    burnTime: "प्रति बत्ती 30–36 मिनट",
  },
  "total-out": {
    tagline: "सिट्रोनेला, जो कमरा साफ़ कर दे।",
    description:
      "प्राकृतिक सिट्रोनेला और लेमनग्रास बत्ती जो कठोर रसायनों के बिना मच्छरों को दूर रखती है। बरामदे, आँगन और शाम के पढ़ाई कक्ष के लिए सुरक्षित।",
    notes: ["सिट्रोनेला", "लेमनग्रास", "नीम"],
    burnTime: "प्रति बत्ती 40–45 मिनट",
  },
  "sraw-dhoop-batti-cone": {
    tagline: "बाँस रहित शंकु, शुद्ध धुआँ।",
    description:
      "बिना बाँस की सींक के हाथ से दबाए गए शंकु, इसलिए जली लकड़ी की गंध नहीं आती। पीतल की थाली में जलाएँ और धीमी, राल भरी सुगंध पाएँ।",
    notes: ["बेंज़ॉइन", "चंदन चूर्ण", "कपूर"],
    burnTime: "प्रति शंकु 18–22 मिनट",
  },
  "srikanth-premium-dhoop": {
    tagline: "मोटी, देर तक जलने वाली मंदिर धूप।",
    description:
      "हलमद्दी और हर्बल गोंद से हाथ से बनी बाँस रहित गीली धूप। देर तक और एक समान जलती है, और बुझने के बाद भी राल की महक बनी रहती है।",
    notes: ["हलमद्दी", "गुग्गुल", "हर्बल गोंद"],
    burnTime: "प्रति बत्ती 25–30 मिनट",
  },
  "srikanth-deluxe-premium-dhoop": {
    tagline: "हमारा सबसे समृद्ध राल मिश्रण।",
    description:
      "हमारी धूप का डीलक्स संस्करण, जिसमें प्राकृतिक राल और सुगंधित तेलों का अनुपात अधिक है — त्योहार, विवाह और मंदिर उपयोग के लिए।",
    notes: ["ऊद", "केसर", "राल"],
    burnTime: "प्रति बत्ती 28–34 मिनट",
  },
};

/** Returns the product with its copy swapped to the active locale. */
export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "en") return product;
  const copy = hiCopy[product.slug];
  if (!copy) return product;
  return { ...product, ...copy, subtitle: product.subtitleHi };
}

/** Primary and secondary name for the active locale. */
export function productNames(product: Product, locale: Locale) {
  return locale === "hi"
    ? { primary: product.nameHi, secondary: product.name }
    : { primary: product.name, secondary: product.nameHi };
}
