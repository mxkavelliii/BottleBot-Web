import axios from "axios";
import React, { useEffect, useState } from "react";
import PopupModal from "../../PopupModal";

//icons
import { RiCloseLine, RiRefreshLine, RiCheckLine } from "react-icons/ri";

const UsersForm = ({ formType, onClose, data }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("Male");
  const [civilStatus, setCivilStatus] = useState("Single");
  const [nationality, setNationality] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [brgy, setBrgy] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("citizen");

  //format birth date
  const [formattedBirthDate, setFormattedBirthDate] = useState("");

  //functions
  const [message, setMessage] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Formats date to 'YYYY-MM-DD'
  };

  const onDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setBirthDate(selectedDate);
    setFormattedBirthDate(formatDate(selectedDate));
  };

  const handleGenderToggle = () => {
    if (gender === "Male") {
      setGender("Female");
    } else if (gender === "Female") {
      setGender("Other");
    } else if (gender === "Other") {
      setGender("Male");
    }
  };

  const handleStatusToggle = () => {
    if (civilStatus === "Single") {
      setCivilStatus("Married");
    } else if (civilStatus === "Married") {
      setCivilStatus("Widowed");
    } else if (civilStatus === "Widowed") {
      setCivilStatus("Single");
    }
  };

  const handleLevelToggle = () => {
    if (level === "citizen") {
      setLevel("staff");
    } else if (level === "staff") {
      setLevel("admin");
    } else if (level === "admin") {
      setLevel("citizen");
    }
  };

  useEffect(() => {
    if (formType === "edit") {
      setFirstName(data.personalInfo.firstName);
      setMiddleName(data.personalInfo.middleName);
      setLastName(data.personalInfo.lastName);

      //date
      const date = new Date(data.personalInfo.dateOfBirth);
      setBirthDate(date);
      setFormattedBirthDate(formatDate(date));

      setGender(data.personalInfo.gender);
      setCivilStatus(data.personalInfo.civilStatus);
      setNationality(data.personalInfo.nationality);
      setHouseNumber(data.contactInfo.address.houseNumber.toString());
      setStreet(data.contactInfo.address.street);
      setBrgy(data.contactInfo.address.barangay);
      setCity(data.contactInfo.address.city);
      setNumber(data.contactInfo.phoneNumbers[0]);
      setEmploymentStatus(data.economicInfo.employmentStatus);
      setOccupation(data.economicInfo.occupation);
      setEmail(data.credentials.email);
      setPassword(data.credentials.password);
      setLevel(data.credentials.level);
    }
  }, []);

  const registerUser = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/users/register`;

      let response = await axios.post(url, {
        personalInfo: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          dateOfBirth: birthDate,
          gender: gender,
          civilStatus: civilStatus,
          nationality: nationality,
        },
        contactInfo: {
          address: {
            houseNumber: houseNumber,
            street: street,
            barangay: brgy,
            city: city,
          },
          phoneNumbers: [number],
        },
        economicInfo: {
          employmentStatus: employmentStatus,
          occupation: occupation,
        },
        credentials: {
          email: email,
          password: password,
          level: level,
        },
      });

      if (response.status === 200) {
        setVisibleModal(true);
        setMessage(response.data.message);
        setIsError(false);
      }
    } catch (error) {
      setVisibleModal(true);
      setMessage(error.response.data.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/users/${data._id}`;

      let response = await axios.put(url, {
        personalInfo: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          dateOfBirth: birthDate,
          gender: gender,
          civilStatus: civilStatus,
          nationality: nationality,
        },
        contactInfo: {
          address: {
            houseNumber: houseNumber,
            street: street,
            barangay: brgy,
            city: city,
          },
          phoneNumbers: [number],
        },
        economicInfo: {
          employmentStatus: employmentStatus,
          occupation: occupation,
        },
        credentials: {
          email: email,
          password: password,
          level: level,
        },
      });

      if (response.status === 200) {
        setVisibleModal(true);
        setMessage(response.data.message);
        setIsError(false);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setVisibleModal(true);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#050301]/50 z-10">
        <div className="w-full h-full flex items-start justify-center overflow-y-auto p-4">
          <div className="w-full md:w-[820px] flex flex-col justify-between items-center space-y-6 bg-[#FAFAFA] font-dm rounded-2xl p-6">
            {/* header */}
            <div className="w-full flex flex-row items-center justify-between pb-6">
              <div className="flex flex-row items-center justify-start">
                <p className="text-xs font-normal">{`Users > ${
                  formType === "add"
                    ? "Add User"
                    : `Edit User > ${data.personalInfo.firstName} ${data.personalInfo.lastName}`
                }`}</p>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="flex items-center justify-center p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={onClose}
                >
                  <RiCloseLine size={16} color="black" />
                </div>
                <div
                  className="flex items-center justify-center p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={
                    formType === "add"
                      ? registerUser
                      : formType === "edit"
                      ? updateUser
                      : null
                  }
                >
                  <RiCheckLine size={16} color="black" />
                </div>
              </div>
            </div>
            {/* Personal Information */}
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {/* header */}
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Personal Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  name, birthdate, gender, civil status etc.
                </p>
              </div>
              {/* content */}
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">First Name</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Middle Name</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="middle name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Last Name</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Birth Date</p>
                </div>
                <input
                  type="date"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="date of birth"
                  value={formattedBirthDate}
                  onChange={onDateChange}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Gender</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                  <p className="text-xs font-normal">{gender}</p>
                  <RiRefreshLine
                    size={16}
                    color="black"
                    className="cursor-pointer"
                    onClick={handleGenderToggle}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Civil Status</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                  <p className="text-xs font-normal">{civilStatus}</p>
                  <RiRefreshLine
                    size={16}
                    color="black"
                    className="cursor-pointer"
                    onClick={handleStatusToggle}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Nationality</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </div>
            </div>
            {/* Contact Information */}
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {/* header */}
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Contact Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  phone number, street, city, brgy etc
                </p>
              </div>
              {/* content */}
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">House Number</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="house number"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Street</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Barangay</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="barangay"
                  value={brgy}
                  onChange={(e) => setBrgy(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">City</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Phone Number</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="phone number"
                  value={number}
                  maxLength={11}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*$/.test(value) && value.length <= 11) {
                      setNumber(value);
                    }
                  }}
                />
              </div>
            </div>
            {/* Economic Information */}
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {/* header */}
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Economic Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  occupation and employment status
                </p>
              </div>
              {/* content */}
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Employment Status</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="employment status"
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Occupation</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
            </div>
            {/* Credentials */}
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {/* header */}
              <div className="w-full flex flex-col items-start justify-center pb-2">
                <p className="text-sm font-semibold">Credentials</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  email, password and user level
                </p>
              </div>
              {/* content */}
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Email</p>
                </div>
                <input
                  type="text"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Password</p>
                </div>
                <input
                  type="password"
                  className="w-1/2 text-left bg-[#EDEDED] outline-none border-none rounded-xl px-4 py-3 text-xs"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2">
                  <p className="text-xs font-normal">Level</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                  <p className="text-xs font-normal">{level}</p>
                  <RiRefreshLine
                    size={16}
                    color="black"
                    className="cursor-pointer"
                    onClick={handleLevelToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visibleModal && (
        <PopupModal
          message={message}
          header="users"
          icon="users"
          onClose={() => {
            setVisibleModal(false);
            if (!isError) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default UsersForm;
