import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import Select from 'react-select';

import "./styles.css";

//// Constants for FancySelect
const collegeOptions = [{ value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
{ value: 'Chemical Engineering', label: 'Chemical Engineering' }]
const departmentOptions = [
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
const yearOptions = [
    { value: '1st year Master', label: '1st year Master' },
    { value: '2nd year PhD', label: '2nd year PhD' },
    { value: 'Alumni', label: 'Alumni'}
]
const timeOptions = [
    { value: 'Monday Morning', label: 'Monday Morning' },
    { value: 'Monday Afternoon', label: 'Monday Afternoon'},
    { value: 'Tuesday Morning', label: 'Tuesday Morning' },
]
const minorityOptions = [
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
const academicTalkOptions = [
    { value: 'academic', label: 'Prefer to mainly discuss academic/research related topics (e.g. learn about each other\'s research)' },
    { value: 'non-academic', label: 'Prefer to mainly discuss non-academic/research related topics (e.g. avoid research talk)'},
    { value: 'no preference', label: 'No preference' },
]
const hobbyOptions = [
    { value: 'sports', label: 'Sports / Fitness / Outdoor activities' },
    { value: 'food', label: 'Food / Beverages / Cooking / Baking'},
    { value: 'tv', label: 'TV / Movies / Books' },
    { value: 'games', label: 'Video games / Board games' },
    { value: 'politics', label: 'Politics / History / Philosophy' },
    { value: 'art', label: 'Music / Dance / Art / Theater / Comedy' },
    { value: 'traveling', label: 'Traveling / Language / Cultures' },
    { value: 'exploring', label: 'Exploring and learning about Pittsburgh' },
]

const groupOptions = [
    {value: "2", label: "2"},
    {value: "3-4", label: "3-4"}
]
const yearPrefOptions = [
    {value: "Masters", label: "Masters"},
    {value: "Junior PhDs", label: "1-2nd year PhDs"},
    {value: "Older PhDs", label: "3+ year PhDs"}
]
const yesNoOptions = [
    {value: "yes", label: "Yes"},
    {value: "no", label: "No"}
]

function TwoColumn(firstCol, secondCol) {
    return (
        <div className="twoCol_container_flex">
            <div className="twoCol_left_flex">
                {firstCol}
            </div>
            <div className="twoCol_right_flex">
                {secondCol}
            </div>
        </div>
        // <div className="twoCol_container">
        //     <div className="twoCol_left">
        //         {firstCol}
        //     </div>
        //     <div className="twoCol_right">
        //         {secondCol}
        //     </div>
        // </div>
    )
}

function FancySelect(props) {
    return (
        TwoColumn(
            <Form.Label>{props.label}</Form.Label>,
            <Select isMulti={props.isMulti} options={props.options} onChange={props.onChange} 
                        isSearchable={true} isClearable={true}/>
        )
    )

    // return (
    //     <div>
    //         {/* <InputGroup>
    //             <InputGroup.Prepend>
    //                 <InputGroup.Text>{props.label}</InputGroup.Text>
    //             </InputGroup.Prepend>
    //             <div style={{width: '10%'}}>
    //             <div>
    //                 <Select classNamePrefix="myCustomPrefix" isMulti={props.isMulti} options={props.options} onChange={props.onChange} 
    //                     isSearchable={true} isClearable={true}/>
    //             </div>
    //         </InputGroup> */}
    //         {/* <Row>
    //             <Col>
    //                 <InputGroup.Text>{props.label}</InputGroup.Text>
    //             </Col>
    //             <Col>
    //                 <Select isMulti={props.isMulti} options={props.options} onChange={props.onChange}
    //                     isSearchable={true} isClearable={true}/>
    //              </Col>
    //         </Row> */}
    //         {/* <div className="twoCol_left">
    //             <InputGroup.Text>{props.label}</InputGroup.Text>
    //         </div> */}
    //         {/* <div className="twoCol_left">
    //             {props.label}
    //         </div> */}
    //         {/* <InputGroup.Text className="twoCol_left">{props.label}</InputGroup.Text> */}
    //         <Form.Label className="twoCol_left">{props.label}</Form.Label>
    //         <div className="twoCol_right">
    //             <Select classNamePrefix="myCustomPrefix" isMulti={props.isMulti} options={props.options} onChange={props.onChange} 
    //                     isSearchable={true} isClearable={true}/>
    //         </div>
    //     </div>
    // )
};

function FreeText(props) {
    return TwoColumn(
        <Form.Label>{props.label}</Form.Label>,
        <Form.Control name={props.name} type="text" value={props.value} onChange={props.onChange}/>
    )
    // return (
    //     <div>
    //         <Row>
    //             <Col>
    //                 <InputGroup.Text>{props.label}</InputGroup.Text>
    //             </Col>
    //             <Col>
    //                 <Form.Control name={props.name} type="text" value={props.value} onChange={props.onChange}/>
    //             </Col>
    //         </Row>
    //     </div>
    // )
}

function MultipleChoice(props) {
    return (
        TwoColumn(
            <Form.Label>{props.label}</Form.Label>,
            props.options.map((anOption) => (
                <Form.Check inline label={anOption.label} name={anOption.value} type={props.type} id={anOption.value} />
            ))
        )
    )
    // return (
    //     <div>
    //         {/* <InputGroup>
    //             <InputGroup.Prepend>
    //                 <InputGroup.Text>{props.label}</InputGroup.Text>
    //             </InputGroup.Prepend>
    //             <div>
    //                 {props.options.map((anOption) => (
    //                     <Form.Check inline label={anOption.label} name={anOption.value} type={props.type} id={anOption.value} />
    //                 ))}
    //             </div>
    //         </InputGroup> */}

    //         <Row>
    //             <Col>
    //                 <InputGroup.Text>{props.label}</InputGroup.Text>
    //             </Col>
    //             <Col>
    //                 {/* <Form.Control name={props.name} type="text" value={props.value} onChange={props.onChange}/>
    //                 <Form.Check inline label="Online" name="group1" type={"checkbox"} id="Online" />
    //                 <Form.Check inline label="In person" name="group1" type={"checkbox"} id="In person"/> */}
    //                 {props.options.map((anOption) => (
    //                     <Form.Check inline label={anOption.label} name={anOption.value} type={props.type} id={anOption.value} />
    //                 ))}
    //             </Col>
    //         </Row>
    //     </div>
    // )
}

class Preferences extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
        }

    }


    // Handling submitting the form
    handleSubmit(event) {
        event.preventDefault();
    }

    // Handling them writing stuff
    handleInputChange(event) {
    }

    minorityBackground(props) {
        return (
            <div>
            <MultipleChoice label="Would you like to meet people with similar minority backgrounds as you?" options={yesNoOptions} type="radio"/>
            <FancySelect label="Minority Background" onChange={props.onChange} options={minorityOptions} isMulti={true}/>
            </div>
        )
    }

      
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FreeText name="name" label="Name" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
                    <FreeText name="pronouns" label="Pronouns" value={this.state.pronouns} onChange={this.handleInputChange.bind(this)}/>

                    <FancySelect label="College" onChange={this.handleInputChange} options={collegeOptions} isMulti={false}/>
                    <FancySelect label="Department/Program" onChange={this.handleInputChange} options={departmentOptions} isMulti={false}/>
                    <FancySelect label="Year" onChange={this.handleInputChange} options={yearOptions} isMulti={false}/>
                    <FancySelect label="Time" onChange={this.handleInputChange} options={timeOptions} isMulti={true}/>

                    <MultipleChoice label="Group size" options={groupOptions} type="checkbox"/>


                    <h3>Who do you want to meet? (optional)</h3>
                    <MultipleChoice label="Preferences between years" options={yearPrefOptions} type="checkbox"/>

                    <FancySelect label="Preference for talking to specific colleges" onChange={this.handleInputChange} 
                        options={collegeOptions} isMulti={true}/>
                    <FancySelect label="Preference for talking to specific departments/programs" onChange={this.handleInputChange} 
                        options={departmentOptions} isMulti={true}/>
                    <this.minorityBackground onChange={this.handleInputChange}/>


                    <h3>What would you like to talk about? (optional)</h3>
                    <FancySelect label="Preference for talking to specific departments/programs" onChange={this.handleInputChange} 
                        options={academicTalkOptions} isMulti={false}/>
                    <FreeText name="researchTopics" label="Research topics" value={this.state.researchTopics} onChange={this.handleInputChange.bind(this)}/>
                    <FancySelect label="Hobbies" onChange={this.handleInputChange} options={hobbyOptions} isMulti={true}/>
                    <FreeText name="hobbiesFreeText" label="Additional hobbies/interests you would like to talk about" 
                        value={this.state.hobbiesFreeText} onChange={this.handleInputChange.bind(this)}/>


                    <h3>Submit!</h3>
                    {/* <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Can we include your anonymized data in our public statistics?</InputGroup.Text>
                        </InputGroup.Prepend>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={"yes"}>
                            <ToggleButton value={"yes"}>Yes</ToggleButton>
                            <ToggleButton value={"no"}>No</ToggleButton>
                        </ToggleButtonGroup>
                    </InputGroup> */}

                    <MultipleChoice label="Can we include your anonymized data in our public statistics?" options={yesNoOptions} type="radio"/>
                    <FreeText name="other" label="Anything else you want us to know for matching purposes?" 
                        value={this.state.other} onChange={this.handleInputChange.bind(this)}/>
                    <Button>Submit</Button>


                </Form>
            </div>
        )
    }

}


export default Preferences;
