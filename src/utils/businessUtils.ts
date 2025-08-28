
import Team1 from "../assets/images/business/team/PP2.jpg"
interface TeamMember {
  name: string;
  position: string;
  image: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  description?: string;
}

export const members: TeamMember[] = [
  {
    name: "Dr. E. Ray-Offor",
    position: "Medical Director",
    image: Team1,
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
    description:
      "Dr. E. Ray-Offor MBBS(Nig), DMAS(India), FWACS, FMAS, FACS. He is a pioneer of Minimal Access Surgery in the Niger Delta region of Nigeria with post fellowship trainings from World Laparoscopy Hospital Gurgaon India, Cuschieri Skills Centre, Ninewells Hospital and Medical School Dundee UK and Roswell Park Cancer Institute Buffalo New York USA. A Senior Lecturer in the department of Surgery, University of Port Harcourt and Honorary Consultant, University of Port Harcourt Teaching Hospital Port Harcourt Rivers State Nigeria. He is a member of professional bodies including World Association of Laparoscopic Surgery (WALS), European Association of Endoscopic Surgery (EAES), Society of American Gastrointestinal Endoscopic Surgeons SAGES (USA), and Society of Gastroenterology and Hepatology in Nigeria (SOGHIN).",
  },

];

interface Service {
  name: string;
  description: string;
  image: string;
}

interface CategoryDetails {
  description: string;
  defaultImage: string;
  services: Service[];
}


export const serviceCategories: Record<string, CategoryDetails> = {
  "Endoscopy Clinic": {
    description:
      "Our Endoscopy Clinic specializes in minimally invasive procedures to diagnose and treat gastrointestinal issues. Endoscopic techniques allow for faster recovery, less discomfort, and highly accurate diagnosis. Our team uses state-of-the-art equipment for various procedures from diagnostic to therapeutic endoscopy.",
    defaultImage: "https://medihealgroup.com/wp-content/uploads/2021/07/endoscopy-2.jpg",
    services: [
      {
        name: "Oesophagoscopy",
        description:
          "Oesophagoscopy is a procedure to examine the esophagus using a flexible tube with a camera. It helps detect inflammation, tumors, ulcers, and swallowing disorders. This procedure is essential for early detection of esophageal cancer and other digestive issues.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafx8LtoB2m_jmk0heh_0mdGdsPTyip2E4JHTm_CXmom9DIdNWcdbKCtxsk3PJuHkForA&usqp=CAU",
      },
      {
        name: "Gastroscopy",
        description:
          "Gastroscopy allows doctors to view the stomach lining and duodenum to detect ulcers, gastritis, tumors, or bleeding. It is crucial for patients with persistent stomach pain, heartburn, or unexplained weight loss.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDq13SxjP0joLpcIYwMN18qiZJ9dW1BMSVw&s",
      },
      {
        name: "Duodenoscopy",
        description:
          "Duodenoscopy is an endoscopic examination of the duodenum, used to diagnose conditions like celiac disease, ulcers, or obstruction. It provides detailed insights into digestive disorders for accurate treatment planning.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1IvpnA3PLKAPpTeShESp46CkNgsl2nDWJg&s",
      },
      {
        name: "Colonoscopy",
        description:
          "Colonoscopy is a vital procedure for screening and diagnosing colon cancer, polyps, and other large intestine issues. Regular colonoscopies help prevent colorectal cancer and detect early signs of bowel disease.",
        image: "/images/services/colonoscopy.jpg",
      },
      {
        name: "Sigmoidoscopy",
        description:
          "Sigmoidoscopy examines the rectum and lower colon to detect polyps, cancer, and inflammation. It is a less invasive alternative to full colonoscopy for specific diagnostic needs.",
        image: "/images/services/sigmoidoscopy.jpg",
      },
      {
        name: "Proctoscopy",
        description:
          "Proctoscopy examines the rectum and anal canal for disorders like hemorrhoids, fissures, or tumors. It's essential for evaluating symptoms like rectal bleeding, pain, or chronic constipation.",
        image: "/images/services/proctoscopy.jpg",
      },
      {
        name: "Laparoscopy",
        description:
          "Laparoscopy is a minimally invasive surgical procedure used to diagnose and treat abdominal or pelvic conditions. It allows surgeons to operate with small incisions, reducing recovery time and risk of complications.",
        image: "/images/services/laparoscopy.jpg",
      },
      {
        name: "Hysteroscopy",
        description:
          "Hysteroscopy is used to inspect the uterine cavity for fibroids, polyps, and abnormalities. It helps in the diagnosis of infertility, abnormal bleeding, and other gynecological conditions.",
        image: "/images/services/hysteroscopy.jpg",
      },
      {
        name: "Cystoscopy",
        description:
          "Cystoscopy examines the bladder and urethra to detect tumors, stones, or infection. This procedure is important for patients with blood in urine, frequent infections, or urinary issues.",
        image: "/images/services/cystoscopy.jpg",
      },
      {
        name: "Laryngoscopy",
        description:
          "Laryngoscopy evaluates the larynx (voice box) for conditions like vocal cord nodules, cancer, or airway obstruction. It's crucial for patients with persistent hoarseness or throat discomfort.",
        image: "/images/services/laryngoscopy.jpg",
      },
      {
        name: "Bronchoscopy",
        description:
          "Bronchoscopy inspects the airways and lungs using a thin tube with a camera. It is essential for diagnosing infections, tumors, or blockages and helps guide treatments like biopsy or suctioning.",
        image: "/images/services/bronchoscopy.jpg",
      },
    ],
  },

  "Radiology": {
    description:
      "Our Radiology Department provides advanced imaging services to accurately diagnose medical conditions. From routine X-rays to detailed MRI and Ultrasound scans, our radiologists ensure high-quality imaging for effective treatment planning.",
    defaultImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYI8z81ul1DnWJ2l5M4o9WJU7z8SW4yGP_8g&s",
    services: [
      {
        name: "Ultrasound",
        description:
          "Ultrasound uses high-frequency sound waves to visualize internal organs, tissues, and blood flow. It's non-invasive and essential for pregnancy monitoring, abdominal diagnostics, and soft tissue evaluation.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6ToT1gztTKJdYlWR48K6C60sT7ihH8EnFQ&s",
      },
      {
        name: "ECHO cardiography",
        description:
          "ECHO cardiography provides detailed images of the heart's structure and function. It is vital for diagnosing heart conditions like valve disease, heart failure, or congenital anomalies.",
        image: "/images/services/echo-cardiography.jpg",
      },
      {
        name: "Doppler Studies",
        description:
          "Doppler studies measure blood flow through vessels, helping detect blockages, clots, or vascular diseases. It is crucial for cardiovascular risk assessment and treatment planning.",
        image: "/images/services/doppler.jpg",
      },
      {
        name: "Plain x-ray",
        description:
          "Plain X-rays provide a quick overview of bones and chest structures. They are essential for detecting fractures, infections, and lung conditions.",
        image: "/images/services/xray.jpg",
      },
      {
        name: "Fluoroscopy",
        description:
          "Fluoroscopy offers real-time moving X-ray images to guide procedures or diagnose dynamic conditions like swallowing disorders or joint movement issues.",
        image: "/images/services/fluoroscopy.jpg",
      },
      {
        name: "Mammography",
        description:
          "Mammography is a specialized X-ray for breast screening. It helps detect breast cancer early and monitor changes in breast tissue over time.",
        image: "/images/services/mammography.jpg",
      },
    ],
  },

  "Executive Health Services": {
    description:
      "Executive Health Services provide comprehensive health evaluations for busy professionals. Our tailored programs combine preventive care, diagnostic tests, and personalized health assessments for optimal wellbeing.",
    defaultImage: "/images/services/executive-health.jpg",
    services: [
      {
        name: "Outpatient medical consultation",
        description:
          "Outpatient consultations provide detailed assessment of health concerns, treatment plans, and referrals. Regular consultations ensure proactive health management.",
        image: "/images/services/outpatient-consultation.jpg",
      },
      {
        name: "Cardiological assessment",
        description:
          "Cardiological assessment evaluates heart health using ECG, ECHO, and physical exams. Early detection of cardiac conditions helps prevent complications.",
        image: "/images/services/cardiological-assessment.jpg",
      },
      {
        name: "ECG/ECHO",
        description:
          "ECG/ECHO tests monitor heart rhythm, function, and structural anomalies. They are crucial for preventive cardiology and ongoing heart disease management.",
        image: "/images/services/ecg-echo.jpg",
      },
      {
        name: "Spirometry",
        description:
          "Spirometry measures lung function and airflow, aiding in the diagnosis of asthma, COPD, and other respiratory conditions. It's essential for preventive and occupational health checks.",
        image: "/images/services/spirometry.jpg",
      },
      {
        name: "Ancillary care",
        description:
          "Ancillary care includes lab tests, imaging, and other diagnostic services to complement medical evaluations. It ensures a comprehensive understanding of your health status.",
        image: "/images/services/ancillary-care.jpg",
      },
    ],
  },
  "General Surgery": {
    description:
      "Our General Surgery department provides comprehensive outpatient consultations and day-case surgeries. We focus on delivering safe and effective surgical care tailored to each patient’s needs.",
    defaultImage: "/images/services/general-surgery.jpg",
    services: [
      {
        name: "Out-patient consultation",
        description:
          "Initial assessment and consultation for surgical conditions. Helps determine the best course of action and whether surgery is needed.",
        image: "/images/services/out-patient-consultation.jpg",
      },
      {
        name: "Day-case surgery",
        description:
          "Minimally invasive or routine surgical procedures performed on an outpatient basis, allowing patients to go home the same day.",
        image: "/images/services/day-case-surgery.jpg",
      },
    ],
  },

  "Oncology Clinic": {
    description:
      "Our Oncology Clinic offers comprehensive cancer care, from diagnosis to treatment and counseling. We provide personalized care plans for each patient to ensure optimal outcomes.",
    defaultImage: "/images/services/oncology-clinic.jpg",
    services: [
      {
        name: "Diagnosis",
        description:
          "Accurate detection and diagnosis of cancer through various imaging and lab tests.",
        image: "/images/services/oncology-diagnosis.jpg",
      },
      {
        name: "Chemotherapy",
        description:
          "Medical treatment using drugs to target and destroy cancer cells, tailored to patient needs.",
        image: "/images/services/chemotherapy.jpg",
      },
      {
        name: "Palliative care",
        description:
          "Supportive care to improve quality of life for patients with serious illness, focusing on symptom management and comfort.",
        image: "/images/services/palliative-care.jpg",
      },
      {
        name: "Counseling",
        description:
          "Psychological and emotional support for patients and families during cancer treatment.",
        image: "/images/services/oncology-counseling.jpg",
      },

    ],
  },
  "Cancer Screening": {
    description:
      "Our Cancer Screening program provides preventive screenings for various cancers. We offer personalized care plans for each patient to ensure optimal outcomes.",
    defaultImage: "/images/services/cancer-screening.jpg",
    services: [
      // Screening for specific organs
      { name: "Breast", description: "Breast cancer screening and detection.", image: "/images/services/breast-screening.jpg" },
      { name: "Cervix", description: "Cervical cancer screening and prevention.", image: "/images/services/cervix-screening.jpg" },
      { name: "Lungs", description: "Screening for lung cancer and related disorders.", image: "/images/services/lungs-screening.jpg" },
      { name: "Colon", description: "Screening for colon cancer and polyps.", image: "/images/services/colon-screening.jpg" },
      { name: "Prostate", description: "Screening for prostate cancer in men.", image: "/images/services/prostate-screening.jpg" },
    ]
  }
       
};


export const faqs = [
  {
    id: 1,
    question: "What is Endoscopy?",
    answer:
      "Endoscopy is a minimally invasive procedure to examine the digestive tract using a flexible tube with a camera. It helps diagnose conditions like ulcers, inflammation, tumors, and swallowing disorders.",
  },
  {
    id: 2,
    question: "Why is a Colonoscopy performed?",
    answer:
      "Colonoscopy is used to examine the colon for polyps, cancer, and other abnormalities. It helps in early detection of colorectal cancer and monitoring digestive health.",
  },
  {
    id: 3,
    question: "What is Sigmoidoscopy?",
    answer:
      "Sigmoidoscopy examines the rectum and lower colon. It helps detect polyps, cancer, or inflammation and is a less invasive alternative to full colonoscopy.",
  },
  {
    id: 4,
    question: "What is Cystoscopy?",
    answer:
      "Cystoscopy allows doctors to examine the bladder and urethra for tumors, stones, or infections. It is recommended for patients with blood in urine or frequent urinary infections.",
  },
  {
    id: 5,
    question: "What is Hysteroscopy?",
    answer:
      "Hysteroscopy is used to inspect the uterine cavity for fibroids, polyps, or abnormalities. It helps diagnose infertility, abnormal bleeding, and other gynecological conditions.",
  },
  {
    id: 6,
    question: "How should I prepare for these procedures?",
    answer:
      "Preparation varies depending on the procedure. Typically, fasting or bowel preparation is required. Your doctor will provide detailed instructions before the procedure.",
  },
  {
    id: 7,
    question: "Are these procedures painful?",
    answer:
      "Most procedures are performed under local anesthesia or sedation. Patients may experience mild discomfort, but modern techniques ensure minimal pain and faster recovery.",
  },
];