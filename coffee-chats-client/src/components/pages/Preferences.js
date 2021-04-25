import React, { useEffect } from 'react';
import { Formik, Form, useField, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";

import {
  Redirect,
  useHistory
} from "react-router-dom";

function Preferences(props) {
  const history = useHistory();

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and alse replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
                <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                                               <div className="error">{meta.error}</div>
                                               ) : null}
                </>
                );
    };
    
    const MyCheckbox = ({ children, ...props }) => {
        const [field, meta] = useField({ ...props, type: "checkbox" });
        return (
                <>
                <label className="checkbox">
                <input {...field} {...props} type="checkbox" />
                {children}
                </label>
                {meta.touched && meta.error ? (
                                               <div className="error">{meta.error}</div>
                                               ) : null}
                </>
                );
    };
    
    // Styled components ....
    const StyledSelect = styled.select`
color: var(--blue);
    `;
    
    const StyledErrorMessage = styled.div`
    font-size: 12px;
color: var(--red-600);
width: 400px;
    margin-top: 0.25rem;
    &:before {
    content: "❌ ";
        font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
    color: var(--red-300);
    }
    `;
    
    const StyledLabel = styled.label`
    margin-top: 1rem;
    `;
    
    const MySelect = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and alse replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
                <>
                <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
                <StyledSelect {...field} {...props} />
                {meta.touched && meta.error ? (
                                               <StyledErrorMessage>{meta.error}</StyledErrorMessage>
                                               ) : null}
                </>
                );
    };
    
    // And now we can use these
    const SignupForm = () => {
        return (
                <>
                <h1>Coffee Chats Preferences</h1>
                <Formik
                initialValues={{
                name: "",
                email: "",
                pronouns: "",
                college: "", // added for our select
                program: "",
                year: "",
                online: false,
                pittsburgh: false,
                matchType: "",
                masters: false,
                juniorPhDs: false,
                seniorPhDs: false
                }}
                validationSchema={Yup.object({
                                             email: Yup.string()
                                             .email("Invalid email addresss`")
                                             .required("Required"),
                                             pronouns: Yup.string().required("Required"),
                                             program: Yup.string().required("Required"),
                                             college: Yup.string()
                                             // specify the set of valid values for college type
                                             // @see http://bit.ly/yup-mixed-oneOf
                                             .oneOf(
                                                    ["engineering","arts","humanities","entertainment","innovation","science","cs","tepper","pitt"],
                                                    "Invalid Job Type"
                                                    )
                                             .required("Required"),
                                             year: Yup.string()
                                             .oneOf(["masters1","masters2","masters3","phd1","phd2","phd3","phd4","phd5","phd6"],
                                                    "Invalid Year"
                                                    )
                                             .required("Required"),
                                             matchType: Yup.string().oneOf(["pair","group","nopref"], "invalid").required("Required")
                                             })}
                onSubmit={async (values, { setSubmitting }) => {
                await new Promise(r => setTimeout(r, 500));
                setSubmitting(false);
                }}
                >
                <Form>
                <MyTextInput
                label="Name"
                name="name"
                type="text"
                />
                <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
                />
                <MyTextInput
                label="Pronouns"
                name="pronouns"
                type="text"
                />
                
                <MySelect label="College" name="college">
                <option value="">Select a college</option>
                <option value="engineering">College of Engineering</option>
                <option value="arts">College of Fine Arts</option>
                <option value="humanities">Dietrich College of Humanities and Social Sciences</option>
                <option value="entertainment">Entertainment Technology Center</option>
                <option value="innovation">Integrated Innovation Institute</option>
                <option value="science">Mellon College of Science</option>
                <option value="cs">School of Computer Science</option>
                <option value="tepper">Tepper School of Business</option>
                <option value="pitt">Pitt School of Medicine</option>
                </MySelect>
                
                <MyTextInput
                label="Full name of your department/program"
                name="program"
                type="text"
                />
                
                <MySelect label="What year are you in?" name="year">
                <option value="">Select a year</option>
                <option value="masters1">1st year Masters</option>
                <option value="masters2">2nd year Masters</option>
                <option value="masters3">3+ year Masters</option>
                <option value="phd1">1st year PhD</option>
                <option value="phd2">2nd year PhD</option>
                <option value="phd3">3rd year PhD</option>
                <option value="phd4">4th year PhD</option>
                <option value="phd5">5th year PhD</option>
                <option value="phd6">6+ year PhD</option>
                </MySelect>
                
                <label>What times are you able to meet? (Eastern Time)</label>

                
                
                <label>Where would you like to meet?</label>
                <MyCheckbox name="online">
                Online (e.g. Zoom)
                </MyCheckbox>
                <MyCheckbox name="pittsburgh">
                In-person in Pittsburgh (physically distant and outside)
                </MyCheckbox>
                
                <MySelect label="How would you like to be matched?" name="matchType">
                <option value="">Select one</option>
                <option value="pair">In a pair</option>
                <option value="group">In a group of 3-4</option>
                <option value="noPref">No preference</option>
                </MySelect>
                
                <h6>All remaining questions are optional, and will be used to find better matches for you.</h6>
                
                <br />
                <h3>Who do you want to meet? (optional)</h3>
                
                <label>Preference between masters students or Junior or Senior PhDs</label>
                <MyCheckbox name="masters">
                Masters
                </MyCheckbox>
                <MyCheckbox name="juniorPhDs">
                1st-2nd year PhDs
                </MyCheckbox>
                <MyCheckbox name="seniorPhDs">
                3rd+ year PhDs
                </MyCheckbox>
                
                <label>Preference for talking to specific colleges</label>
                <MyCheckbox name="engineeringPref">
                College of Engineering
                </MyCheckbox>
                <MyCheckbox name="artsPref">
                College of Fine Arts
                </MyCheckbox>
                <MyCheckbox name="humanitiesPref">
                Dietrich College of Humanities & Social Sciences
                </MyCheckbox>
                <MyCheckbox name="entertainmentPref">
                Entertainment Technology Center
                </MyCheckbox>
                <MyCheckbox name="heinzPref">
                Heinz College of Information Systems and Public Policy
                </MyCheckbox>
                <MyCheckbox name="innovationPref">
                Integrated Innovation Institute
                </MyCheckbox>
                <MyCheckbox name="sciencePref">
                Mellon College of Science
                </MyCheckbox>
                <MyCheckbox name="csPref">
                School of Computer Science
                </MyCheckbox>
                <MyCheckbox name="tepperPref">
                Tepper School of Business
                </MyCheckbox>
                <MyCheckbox name="pittPref">
                Pitt School of Medicine
                </MyCheckbox>
                
                <MyTextInput
                label="Preference for talking to people from specific programs"
                name="programPref"
                type="text"
                />
                
                <MySelect label="Are you interested in meeting people with the same minority background as you?" name="minorityPref">
                <option value="">Select one</option>
                <option value="minorityYes">Yes</option>
                <option value="minorityNoPref">No preference</option>
                </MySelect>
                
                <label>Minority Background</label>
                <MyCheckbox name="hispanic">
                Hispanic/Latinx
                </MyCheckbox>
                <MyCheckbox name="black">
                Black
                </MyCheckbox>
                <MyCheckbox name="asian">
                Asian/Pacific Islander
                </MyCheckbox>
                <MyCheckbox name="indigenous">
                Indigenous
                </MyCheckbox>
                <MyCheckbox name="arab">
                Arab/Middle Eastern
                </MyCheckbox>
                <MyCheckbox name="female">
                Female
                </MyCheckbox>
                <MyCheckbox name="queer">
                Queer
                </MyCheckbox>
                <MyCheckbox name="nb-trans">
                Non-binary/Transgender
                </MyCheckbox>
                <MyCheckbox name="neurodivergent">
                Neurodivergent
                </MyCheckbox>
                <MyCheckbox name="disabled">
                Physically Disabled
                </MyCheckbox>
                <MyCheckbox name="international">
                Internationl Student
                </MyCheckbox>
                <MyCheckbox name="parent">
                Student Parent
                </MyCheckbox>
                
                <br />
                <h3>What would you like to talk about? (optional)</h3>
                
                <MySelect label="Academic/Research-Related Topics" name="academic">
                <option value="">Select one</option>
                <option value="academicPref">Prefer to mainly discuss academic/research related topics (e.g. learn about each other's research)</option>
                <option value="nonacademicPref">Prefer to mainly discuss non-academic/research related topics (e.g. avoid research talk)</option>
                <option value="noPrefAcademic">No preference</option>
                </MySelect>
                                                                                                        
                <MyTextInput
                 label = "Research topics/interests you would like to talk about"
                 name = "academicTopics"
                 type = "text"
                 />
                                                                                                        
                <label>Categories of Hobbies/Interests</label>
                 <MyCheckbox name = "sports">
                  Sports / Fitness / Outdoor activities
                 </MyCheckbox>
                 <MyCheckbox name = "food">
                  Food / Beverages / Cooking / Baking
                  </MyCheckbox>
                  <MyCheckbox name = "tv">
                  TV / Movies / Books
                  </MyCheckbox>
                  <MyCheckbox name = "games">
                  Video games / Board games
                  </MyCheckbox>
                  <MyCheckbox name = "politics">
                  Politics / History / Philosophy
                  </MyCheckbox>
                  <MyCheckbox name = "art">
                  Music / Dance / Art / Theater / Comedy
                   </MyCheckbox>
                  <MyCheckbox name = "traveling">
                  Traveling / Language / Cultures
                  </MyCheckbox>
                  <MyCheckbox name = "exploring">
                  Exploring and learning about Pittsburgh
                  </MyCheckbox>
                 
                <MyTextInput
                 label = "Hobbies/interests you would like to talk about"
                 name="hobbyTOpics"
                  type = "text"
                 />
                      
                                                                                                        
                <br />
                <h3>Submit!</h3>
                                                                                                        
                <MySelect label="Can you include your anonymized data in our public statistics?" name = "data">
                <option value="">Select one</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </MySelect>
                                                                                                        
                 <MyTextInput
                  label = "Anything else you want us to know for matching purposes?"
                   name = "otherInfo"
                  type="text"
                  />
                                                                                                        
                <br />
                <button type="submit">Submit</button>
                </Form>
                </Formik>
                </>
                );
    };

    
  if (props.user) {
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="preferencesContainer">
        <br />
        <div className="preferences">
           <SignupForm />
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to="/profile" />
    )
  }
}

export default Preferences;
