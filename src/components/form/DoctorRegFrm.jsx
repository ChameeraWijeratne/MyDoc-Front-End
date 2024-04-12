import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './userRegFrm.css';
import Logo from './../../assest/data/images/Logo.png';
import 'react-toastify/dist/ReactToastify.css';
import { NavigateNext } from '@mui/icons-material';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { imageDb } from './Config';
import { ref, uploadBytes, updateMetadata } from 'firebase/storage';
import { v4 } from 'uuid';

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
/>;

export default function DoctorRegFrm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nicNumber: '',
    gender: '',
    birthday: '',
    profilePic: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    email: '',
    contactNumber: '',
    mbbsId: '',
    mbbsCertificate: '',
    doctorCategory: '',
    password: '',
    isActivate: false,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(true);
  const [postalCode, setPostalCode] = useState('');
  const [validPostalCode, setValidPostalCode] = useState(true);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [nicNumber, setNicNumber] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [nicBirthday, setNicBirthday] = useState('');
  const [nicGender, setNicGender] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [contactNumber, setContactNumber] = useState('');
  const [isContactNumberValid, setIsContactNumberValid] = useState(true);
  const [proPic, setProPic] = useState('');
  const [certificate, setCertificate] = useState('');

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProPic(file);
    const fileId = v4();
    const fileExtension = file.type.split('/')[1];
    const imgRef = ref(imageDb, `files/ProPics/${fileId}.${fileExtension}`);

    uploadBytes(imgRef, file)
      .then((snapshot) => {
        console.log('File uploaded successfully:', snapshot);

        const newMetadata = {
          contentType: 'image/jpeg', // Update the content type to image/jpeg
          // You can add more metadata properties here if needed
        };

        // Update metadata properties
        updateMetadata(imgRef, newMetadata)
          .then((metadata) => {
            console.log('Metadata updated successfully:', metadata);
            // Metadata for the uploaded file is returned in the Promise
          })
          .catch((error) => {
            console.error('Error updating metadata:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });

    uploadBytes(imgRef, proPic)
      .then(() => {
        console.log('Image uploaded successfully');
        setProPic(file);
        setFormData({
          ...formData,
          profilePic: `${fileId}.${fileExtension}`,
        });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        // Handle error (e.g., display error message to user)
      });
  };

  const handleCertificateImageChange = (e) => {
    const file1 = e.target.files[0];
    setCertificate(file1);
    const file1Id = v4();
    const file1Extension = file1.type.split('/')[1];
    const imgRef1 = ref(
      imageDb,
      `files/Certificates/${file1Id}.${file1Extension}`
    );

    uploadBytes(imgRef1, file1)
      .then((snapshot) => {
        console.log('File uploaded successfully:', snapshot);

        const newMetadata = {
          contentType: 'application/pdf', // Update the content type to image/jpeg
          // You can add more metadata properties here if needed
        };

        // Update metadata properties
        updateMetadata(imgRef1, newMetadata)
          .then((metadata) => {
            console.log('Metadata updated successfully:', metadata);
            // Metadata for the uploaded file is returned in the Promise
          })
          .catch((error) => {
            console.error('Error updating metadata:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });

    uploadBytes(imgRef1, certificate);
    setFormData({
      ...formData,
      mbbsCertificate: `${file1Id}.${file1Extension}`,
    });
  };

  const dArray = [
    { month: 'January', days: 31 },
    { month: 'February', days: 29 },
    { month: 'March', days: 31 },
    { month: 'April', days: 30 },
    { month: 'May', days: 31 },
    { month: 'June', days: 30 },
    { month: 'July', days: 31 },
    { month: 'August', days: 31 },
    { month: 'September', days: 30 },
    { month: 'October', days: 31 },
    { month: 'November', days: 30 },
    { month: 'December', days: 31 },
  ];

  useEffect(() => {
    if (nicNumber) {
      handleValidateNIC();
    } else {
      setValidationError('');
      setNicBirthday('');
      setNicGender('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicNumber]);

  const findDayAndGender = (days) => {
    let dayList = days;
    let month = '';
    let gender = '';

    if (dayList < 500) {
      gender = 'Male';
    } else {
      gender = 'Female';
      dayList -= 500;
    }

    if (dayList > 366) {
      setValidationError('You Entered NIC Number Is wrong');
      gender = '';
    }

    for (let i = 0; i < dArray.length; i++) {
      if (dArray[i].days < dayList) {
        dayList -= dArray[i].days;
      } else {
        month = dArray[i].month;
        break;
      }
    }

    return { day: dayList, month, gender };
  };

  const extractData = (nicNumber) => {
    let year = '';
    let dayList = '';
    let character = '';

    if (nicNumber.length === 10) {
      year = nicNumber.substr(0, 2);
      dayList = nicNumber.substr(2, 3);
      character = nicNumber.substr(9, 1);
    } else if (nicNumber.length === 12) {
      year = nicNumber.substr(0, 4);
      dayList = nicNumber.substr(4, 3);
      character = 'no';
    }

    return { year, dayList, character };
  };

  const handleValidateNIC = () => {
    setValidationError(false);

    if (validation(nicNumber)) {
      const extractedData = extractData(nicNumber);
      const { dayList } = extractedData;
      const { month, day, gender } = findDayAndGender(dayList);

      const bday = `${day}-${month}-${extractedData.year}`;
      const birthday = new Date(
        bday.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
      );
      setNicBirthday(`${getFormattedDate(birthday)}`);
      setFormData({
        ...formData,
        birthday: `${getFormattedDate(birthday)}`,
      });
      setNicGender(`${gender}`);
      setFormData({
        ...formData,
        gender: `${gender}`,
      });
    } else {
      setValidationError('Invalid NIC');
    }
  };

  const validation = (nicNumber) => {
    if (
      (nicNumber.length === 10 &&
        !isNaN(nicNumber.substr(0, 9)) &&
        isNaN(nicNumber.substr(9, 1).toLowerCase()) &&
        ['v'].includes(nicNumber.substr(9, 1).toLowerCase())) ||
      (nicNumber.length === 12 && !isNaN(nicNumber))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNicNumberChange = (event) => {
    const nicNumberValue = event.target.value;
    setNicNumber(nicNumberValue);

    // Assuming you want to include NIC number in the formData state
    setFormData({
      ...formData,
      nicNumber: nicNumberValue,
    });
  };

  const validateContactNumber = (contactNumber) => {
    // Implement your contact number validation logic here
    const isValid = /^[0-9]{10}$/.test(contactNumber);
    return isValid;
  };

  const handleContactNumberChange = (event) => {
    const contactNumberValue = event.target.value;
    setContactNumber(contactNumberValue);

    // Validate the contact number and update the validation state
    setIsContactNumberValid(validateContactNumber(contactNumberValue));

    // Update the contact number in the formData
    setFormData({ ...formData, contactNumber: contactNumberValue });
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  const validateEmail = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    setIsValidEmail(emailRegex.test(email));
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Set the email in the formData
    setFormData({ ...formData, email: emailValue });
  };

  const validatePassword = (password) => {
    // Password should have at least 8 characters
    // It should contain at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfPassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
    setFormData({ ...formData, password: newPassword });
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    setFormData({ ...formData, confirmPassword: confirmPasswordValue });
  };

  const handlePostalCodeChange = (event) => {
    const inputValue = event.target.value;
    setPostalCode(inputValue);

    // Set the postal code in the formData
    setFormData({ ...formData, postalCode: inputValue });

    // Replace the regular expression with the appropriate pattern for your country
    const postalCodePattern = /^\d{5}$/;

    // Check if the postal code matches the expected pattern
    const isValid = postalCodePattern.test(inputValue);
    setValidPostalCode(isValid);
  };

  const handleSubmit = async (event) => {
    /*handleValidateNIC();*/
    if (!validationError) {
      event.preventDefault();
      console.log({ validationError });
    } else {
      event.preventDefault();
      console.log({ validationError });
    }

    if (isValidEmail) {
      event.preventDefault();
      console.log('Valid Email...');
    } else {
      event.preventDefault();
      console.log('Invalid Email. Please fix and submit again.');
    }

    if (validPostalCode) {
      event.preventDefault();
      console.log('Valid postal code. Submitting form...');
      // Add your form submission logic here
    } else {
      event.preventDefault();
      console.log('Invalid postal code. Please fix and submit again.');
    }

    validatePassword();
    validateConfPassword();
    if (!passwordError) {
      if (validPostalCode && isValidEmail && !validationError) {
        try {
          console.log(formData);
          const response = await axios.post(
            'http://localhost:8080/api/v1/doctor/save',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          // Handle the response from the backend
          console.log(response.data);

          toast.success('Form submitted successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Redirect to the home page after a successful submission
          setTimeout(() => {
            window.location.href = '/';
          }, 4000);
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('Error submitting form. Please try again later.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
      const message = 'Passwords do not match. Please fix and submit again.';
      console.log(message);
    }
  };

  return (
    <div className="container">
      <header>Doctor Registration</header>
      <img className="doc-img" src={Logo} alt="" />
      <ToastContainer />
      <form onSubmit={handleSubmit} enctype="multipart/form-data" action="#">
        <div className="form first">
          <div className="details personal">
            <div className="fields">
              <div className="input-field">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label>NIC</label>
                <input
                  type="text"
                  value={formData.nicNumber}
                  onChange={handleNicNumberChange}
                  maxLength={12}
                  required
                />
              </div>
              <span className="nicErrorMsg">
                {validationError && (
                  <p style={{ color: 'red' }}>{validationError}</p>
                )}
              </span>
              <div className="input-field">
                <label>Gender</label>
                <input
                  type="text"
                  value={nicGender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: nicGender })
                  }
                  readOnly
                />
              </div>
              <div className="input-field">
                <label>Birth Day</label>
                <input
                  type="text"
                  value={nicBirthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: nicBirthday })
                  }
                  placeholder="MM-DD-YYYY"
                  readOnly
                />
              </div>
              <div className="input-field">
                <label>Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleProfileImageChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form second">
          <div className="details contact">
            <div className="fields">
              <div className="input-field">
                <label>Address Line1</label>
                <input
                  type="text"
                  disabled={validationError}
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label>Address Line2</label>
                <input
                  type="text"
                  disabled={validationError}
                  value={formData.addressLine2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label>City</label>
                <input
                  type="text"
                  disabled={validationError}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-field">
                <label>Postal Code</label>
                <input
                  type="number"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  disabled={validationError}
                  required
                />
              </div>
              <span className="pcErrorMsg">
                {!validPostalCode && (
                  <p style={{ color: 'red' }}>Invalid Postal Code.</p>
                )}
              </span>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                  disabled={validationError}
                  required
                />
              </div>
              <span className="emailErrorMsg">
                {!isValidEmail && (
                  <p style={{ color: 'red' }}>Invalid Email.</p>
                )}
              </span>
              <div className="input-field">
                <label>Contact Number</label>
                <input
                  type="number"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                  className={isContactNumberValid ? '' : 'invalid'}
                  required
                />
              </div>
              <span className="contactNumError">
                {!isContactNumberValid && (
                  <p style={{ color: 'red' }}>Invalid Contact Number.</p>
                )}
              </span>
              <div className="input-field">
                <label>MBBS ID</label>
                <input
                  type="text"
                  value={formData.mbbsId}
                  onChange={(e) =>
                    setFormData({ ...formData, mbbsId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-field">
                <label>MBBS Certificate</label>
                <input
                  type="file"
                  name="mbbsCertificate"
                  onChange={handleCertificateImageChange}
                />
              </div>
              <div className="input-field">
                <label>Doctor Category</label>
                <select
                  id="doctorCategory"
                  value={formData.doctorCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, doctorCategory: e.target.value })
                  }
                  name="doctorCategory"
                >
                  <option value="" disabled selected>
                    Select Doctor Category
                  </option>
                  <option value="General Practitioner">
                    General Practitioner
                  </option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form third">
            <div className="details contact">
              <div className="fields">
                <div className="input-field">
                  <label>Enter Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={
                      !validPostalCode || !isValidEmail || validationError
                    }
                    required
                  />
                </div>
                <span className="pwordErrorMsg">
                  {!isPasswordValid && (
                    <p style={{ color: 'red' }}>Password is Invalid</p>
                  )}
                  {passwordError && isPasswordValid && (
                    <p style={{ color: 'red' }}>{passwordError}</p>
                  )}
                </span>
                <div className="input-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    disabled={
                      !validPostalCode || !isValidEmail || validationError
                    }
                    required
                  />
                </div>
                <div className="input-field"></div>
              </div>
            </div>
          </div>
          <div className="form fourth">
            <div className="details submit">
              <div className="fields">
                <div className="input-field"></div>
                <button className="nextBtn" type="submit">
                  <span className="btnText">Register</span>
                  <NavigateNext />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
