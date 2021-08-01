
//// Constants for Preferences.js
export const collegeOptions = [
    { value: 'College of Engineering', label: 'College of Engineering' },
    { value: 'College of Fine Arts', label: 'College of Fine Arts' },
    { value: 'Dietrich College of Humanities & Social Sciences', label: 'Dietrich College of Humanities & Social Sciences' },
    { value: 'Heinz College of Information Systems and Public Policy', label: 'Heinz College of Information Systems and Public Policy' },
    { value: 'Mellon College of Science', label: 'Mellon College of Science' },
    { value: 'School of Computer Science', label: 'School of Computer Science' },
    { value: 'Tepper School of Business', label: 'Tepper School of Business' },
    { value: 'University-Level Programs', label: 'University-Level Programs' }
]
export const collegeToDeps = {
    coe: [
        { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
        { value: 'Chemical Engineering', label: 'Chemical Engineering' },
    ],
    cfa: [
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Art', label: 'Art' }
    ]
}
export const departmentOptions = [
    { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
    { value: 'Chemical Engineering', label: 'Chemical Engineering' },
    { value: 'Civil and Environmental Engineering', label: 'Civil and Environmental Engineering' },
    { value: 'Electrical & Computer Engineering', label: 'Electrical & Computer Engineering' },
    { value: 'Energy Science, Technology and Policy', label: 'Energy Science, Technology and Policy' },
    { value: 'Engineering and Public Policy', label: 'Engineering and Public Policy' },
    { value: 'Engineering & Technology Innovation Management', label: 'Engineering & Technology Innovation Management' },
    { value: 'Information Networking Institute (MSIS/INI)', label: 'Information Networking Institute (MSIS/INI)' },
    { value: 'Materials Science and Engineering', label: 'Materials Science and Engineering' },
    { value: 'Mechanical Engineering (MechE)', label: 'Mechanical Engineering (MechE)' },
    { value: 'COE Interdisciplinary Programs', label: 'COE Interdisciplinary Programs' },
    { value: 'Master of Science in Software Engineering', label: 'Master of Science in Software Engineering' },
    { value: 'Master of Science in Software Management', label: 'Master of Science in Software Management' },
    { value: 'Bicoastal Programs', label: 'Bicoastal Programs' },
    { value: 'MSTV', label: 'MSTV' },
    { value: 'Dual Degree ECE/ETIM', label: 'Dual Degree ECE/ETIM' },
    { value: 'Architecture', label: 'Architecture' },
    { value: 'Art', label: 'Art' },
    { value: 'Design', label: 'Design' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Music', label: 'Music' },
    { value: 'CFA Interdisciplinary Programs', label: 'CFA Interdisciplinary Programs' },
    { value: 'English', label: 'English' },
    { value: 'History', label: 'History' },
    { value: 'Institute for Politics and Strategy', label: 'Institute for Politics and Strategy' },
    { value: 'Modern Languages', label: 'Modern Languages' },
    { value: 'Neuroscience Institute ', label: 'Neuroscience Institute ' },
    { value: 'Philosophy', label: 'Philosophy' },
    { value: 'Psychology', label: 'Psychology' },
    { value: 'Social and Decision Sciences', label: 'Social and Decision Sciences' },
    { value: 'Statistics & Data Science', label: 'Statistics & Data Science' },
    { value: 'Entertainment Technology Center', label: 'Entertainment Technology Center' },
    { value: 'Arts Management', label: 'Arts Management' },
    { value: 'Business Intelligence & Data Analytics', label: 'Business Intelligence & Data Analytics' },
    { value: 'Entertainment Industry Management', label: 'Entertainment Industry Management' },
    { value: 'Health Care Analytics', label: 'Health Care Analytics' },
    { value: 'Health Care Analytics & IT', label: 'Health Care Analytics & IT' },
    { value: 'Health Care Policy & Management (MSHCPM)', label: 'Health Care Policy & Management (MSHCPM)' },
    { value: 'Information Security & Assurance', label: 'Information Security & Assurance' },
    { value: 'Information Security Policy & Management', label: 'Information Security Policy & Management' },
    { value: 'Information Systems Management (MISM)', label: 'Information Systems Management (MISM)' },
    { value: 'Information Technology (part-time)', label: 'Information Technology (part-time)' },
    { value: 'Information Technology Management', label: 'Information Technology Management' },
    { value: 'Medical Managment', label: 'Medical Managment' },
    { value: 'Public Management', label: 'Public Management' },
    { value: 'Public Managment (part-time)', label: 'Public Managment (part-time)' },
    { value: 'Public Policy & Data Analytics', label: 'Public Policy & Data Analytics' },
    { value: 'Public Policy & Management (MSPPM)', label: 'Public Policy & Management (MSPPM)' },
    { value: 'Public Policy & Managment - Data Analytics', label: 'Public Policy & Managment - Data Analytics' },
    { value: 'Public Policy in Washington, DC', label: 'Public Policy in Washington, DC' },
    { value: 'Software Design & Managment', label: 'Software Design & Managment' },
    { value: 'Integrated Innovation Institute', label: 'Integrated Innovation Institute' },
    { value: 'Biological Sciences', label: 'Biological Sciences' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Mathematical Sciences (Math/Mathematics)', label: 'Mathematical Sciences (Math/Mathematics)' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Pitt School of Medicine', label: 'Pitt School of Medicine' },
    { value: 'Computational Biology Department (CBD)', label: 'Computational Biology Department (CBD)' },
    { value: 'Computer Science (CSD/CS)', label: 'Computer Science (CSD/CS)' },
    { value: 'Human-Computer Interaction Institute (HCI)', label: 'Human-Computer Interaction Institute (HCI)' },
    { value: 'Institute for Software Research (ISR)', label: 'Institute for Software Research (ISR)' },
    { value: 'Computational Biology Department (CBD)', label: 'Computational Biology Department (CBD)' },
    { value: 'Language Technologies Institute (LTI)', label: 'Language Technologies Institute (LTI)' },
    { value: 'Machine Learning Department (MLD/ML)', label: 'Machine Learning Department (MLD/ML)' },
    { value: 'Robotics Institute (RI)', label: 'Robotics Institute (RI)' },
    { value: 'Master of Business Administration (MBA)', label: 'Master of Business Administration (MBA)' },
    { value: 'Master of Science in Business Analytics', label: 'Master of Science in Business Analytics' },
    { value: 'Master of Science in Product Management', label: 'Master of Science in Product Management' },
    { value: 'Master of Integrated Innovation for Products & Services (MIIPS)', label: 'Master of Integrated Innovation for Products & Services (MIIPS)' },
    { value: 'Master of Science in Computational Finance', label: 'Master of Science in Computational Finance' },
    { value: 'MBA Civil and Environmental Engineering', label: 'MBA Civil and Environmental Engineering' },
    { value: 'MBA and Juris Doctorate Law', label: 'MBA and Juris Doctorate Law' },
    { value: 'MBA and Software Engineering', label: 'MBA and Software Engineering' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Business Technologies', label: 'Business Technologies' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Financial Economics', label: 'Financial Economics' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Operations Management', label: 'Operations Management' },
    { value: 'Operations Research', label: 'Operations Research' },
    { value: 'Organizational Behavior and Theory', label: 'Organizational Behavior and Theory' },
    { value: 'Algorithms, Combinatorics and Optimization', label: 'Algorithms, Combinatorics and Optimization' },
    { value: 'Behavioral Economics', label: 'Behavioral Economics' },
    { value: 'Economics and Public Policy', label: 'Economics and Public Policy' }
]
export const yearOptions = [
    { value: '1st year Master', label: '1st year Master' },
    { value: '2nd year PhD', label: '2nd year PhD' },
    { value: 'Alumni', label: 'Alumni'}
]
export const timeOptions = [
    { value: 'Monday Morning', label: 'Monday Morning' },
    { value: 'Monday Afternoon', label: 'Monday Afternoon'},
    { value: 'Tuesday Morning', label: 'Tuesday Morning' },
]
export const minorityOptions = [
    { value: 'hispanic', label: 'Hispanic/Latinx' },
    { value: 'black', label: 'Black'},
    { value: 'asian', label: 'Asian/Pacific Islander' },
    { value: 'indigenous', label: 'Indigenous'},
    { value: 'arab', label: 'Arab/Middle Eastern'},
    { value: 'female', label: 'Female'},
    { value: 'queer', label: 'Queer'},
    { value: 'nb-trans', label: 'Non-binary/Transgender'},
    { value: 'neurodivergent', label: 'Neurodivergent'},
    { value: 'disabled', label: 'Physically Disabled'},
    { value: 'international', label: 'International Student'},
    { value: 'parent', label: 'Student Parent'},
]
export const academicTalkOptions = [
    { value: 'academic', label: 'Prefer to mainly discuss academic/research related topics (e.g. learn about each other\'s research)' },
    { value: 'non-academic', label: 'Prefer to mainly discuss non-academic/research related topics (e.g. avoid research talk)'},
    { value: 'no preference', label: 'No preference' },
]
export const hobbyOptions = [
    { value: 'sports', label: 'Sports / Fitness / Outdoor activities' },
    { value: 'food', label: 'Food / Beverages / Cooking / Baking'},
    { value: 'tv', label: 'TV / Movies / Books' },
    { value: 'games', label: 'Video games / Board games' },
    { value: 'politics', label: 'Politics / History / Philosophy' },
    { value: 'art', label: 'Music / Dance / Art / Theater / Comedy' },
    { value: 'traveling', label: 'Traveling / Language / Cultures' },
    { value: 'exploring', label: 'Exploring and learning about Pittsburgh' },
]

export const groupOptions = [
    {value: "2", label: "2"},
    {value: "3-4", label: "3-4"}
]
export const yearPrefOptions = [
    {value: "Masters", label: "Masters"},
    {value: "Junior PhDs", label: "1-2nd year PhDs"},
    {value: "Older PhDs", label: "3+ year PhDs"}
]
export const yesNoOptions = [
    {value: "yes", label: "Yes"},
    {value: "no", label: "No"}
]