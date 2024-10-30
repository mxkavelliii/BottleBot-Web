import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Staff/Navbar";
import { useAuth } from "../../context/AuthProvider";
import Image from "../../assets/Man.jpg";
import Logo from "../../assets/Bottle_Bot.png";

//icons
import {
  RiDoorOpenLine,
  RiRefreshLine,
  RiEdit2Line,
  RiCloseLine,
  RiCheckLine,
} from "react-icons/ri";
import axios from "axios";
import PopupModal from "../../Components/PopupModal";

const Profile = () => {
  const { onLogout, updateUser, user } = useAuth();

  //data
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("Male");
  const [civilStatus, setCivilStatus] = useState("Single");
  const [nationality, setNationality] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [brgy, setBrgy] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [formattedBirthDate, setFormattedBirthDate] = useState("");

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [isError, setIsError] = useState(false);

  //initialize data
  const setFieldsData = (user) => {
    setFirstName(user?.personalInfo.firstName);
    setMiddleName(user?.personalInfo.middleName);
    setLastName(user?.personalInfo.lastName);

    //date
    const date = new Date(user.personalInfo.dateOfBirth);
    setBirthDate(date);
    setFormattedBirthDate(formatDate(date));

    setGender(user?.personalInfo.gender);
    setCivilStatus(user?.personalInfo.civilStatus);
    setNationality(user?.personalInfo.nationality);
    setHouseNumber(user?.contactInfo.address.houseNumber.toString());
    setStreet(user?.contactInfo.address.street);
    setBrgy(user?.contactInfo.address.barangay);
    setCity(user?.contactInfo.address.city);
    setPhoneNumber(user?.contactInfo.phoneNumbers[0]);
    setEmploymentStatus(user?.economicInfo.employmentStatus);
    setOccupation(user?.economicInfo.occupation);
    setEmail(user.credentials.email);
    setPassword(user?.credentials.password);
    setLevel(user?.credentials.level);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    if (user && user._id) {
      try {
        let url = `http://localhost:8080/api/users/${user._id}`;

        let response = await axios.get(url);

        if (response.status === 200) {
          updateUser(response.data.user);
          setFieldsData(response.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    if (user) {
      try {
        let url = `http://localhost:8080/api/users/${user._id}`;

        const response = await axios.put(url, {
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
            phoneNumbers: [phoneNumber],
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
          setMessage(response.data.message);
          setVisibleModal(true);
          setIsError(false);
        }
      } catch (error) {
        setMessage(error.response.data.message);
        setVisibleModal(true);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
  };

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

  return (
    <>
      <Navbar />
      <div className="w-full min-h-[100svh] flex flex-col space-y-6 items-center justify-start bg-[#E6E6E6] px-4 pt-4 pb-6 font-dm tracking-normal">
        <div className="w-full md:w-[820px] flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <div className="flex items-center justify-center bg-[#FAFAFA] rounded-xl p-1 shadow-xl shadow-black/10">
              <img
                src={Logo}
                alt="/"
                className="w-[30px] h-[30px] rounded-full"
              />
            </div>
            <p className="text-xs font-normal">
              {user
                ? `Welcome, ${user.personalInfo.firstName} ${user.personalInfo.lastName}`
                : null}
            </p>
          </div>
          <div className="flex flex-row space-x-4 items-center justify-center px-2">
            <RiDoorOpenLine
              size={16}
              color="rgba(0, 0, 0, 0.5)"
              className="cursor-pointer"
              onClick={onLogout}
            />
            <img
              src={Image}
              alt="/"
              className="w-[30px] h-[30px] rounded-full"
            />
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-col justify-center items-center rounded-tl-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden font-dm">
          <div
            className="h-[20svh] w-full p-6"
            style={{
              backgroundImage:
                "linear-gradient(to right top, #e9ff00, #d9f700, #c9f000, #b9e800, #aae000, #78d846, #47cc68, #00bf81, #00a4a2, #17849e, #51657b, #4e4e4e)",
              backgroundSize: "cover",
            }}
          >
            <div className="w-full flex flex-row space-x-2 items-center justify-end">
              {edit ? (
                <>
                  <div
                    className="flex p-2 rounded-full bg-[#050301]/25 cursor-pointer"
                    onClick={() => {
                      fetchUser();
                      setEdit(false);
                    }}
                  >
                    <RiCloseLine size={16} color="white" />
                  </div>
                  <div
                    className="flex p-2 rounded-full bg-[#050301]/25 cursor-pointer"
                    onClick={updateProfile}
                  >
                    <RiCheckLine size={16} color="white" />
                  </div>
                </>
              ) : (
                <div
                  className="flex p-2 rounded-full bg-[#050301]/25 cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  <RiEdit2Line size={16} color="white" />
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-6  bg-[#FAFAFA] p-6">
            <div className="w-full flex flex-row relative items-center justify-start space-x-4 mb-6">
              <div className="absolute top-[-200%] w-[120px] h-[120px] flex items-center justify-center rounded-full overflow-hidden border-4 border-white">
                <img src={Image} alt="/" className="bg-cover" />
              </div>
              <div className="w-[120px] flex items-center justify-center rounded-full overflow-hidden"></div>
              <div className="w-2/3 truncate flex flex-col items-start justify-center">
                <p className="text-sm font-semibold">
                  {user
                    ? `${user.personalInfo.firstName} ${user.personalInfo.lastName}`
                    : null}
                </p>
                <p className="text-xs font-normal uppercase text-[#6E6E6E]">
                  #{user ? user._id : null}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
                  />
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="w-1/2">
                    <p className="text-xs font-normal">Gender</p>
                  </div>
                  <div className="w-1/2 flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                    <p className="text-xs font-normal">{gender}</p>
                    {edit ? (
                      <RiRefreshLine
                        size={16}
                        color="black"
                        className="cursor-pointer"
                        onClick={handleGenderToggle}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="w-1/2">
                    <p className="text-xs font-normal">Civil Status</p>
                  </div>
                  <div className="w-1/2 flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                    <p className="text-xs font-normal">{civilStatus}</p>
                    {edit ? (
                      <RiRefreshLine
                        size={16}
                        color="black"
                        className="cursor-pointer"
                        onClick={handleStatusToggle}
                      />
                    ) : null}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    value={phoneNumber}
                    maxLength={11}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setPhoneNumber(value);
                      }
                    }}
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
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
                    readOnly={edit ? false : true}
                  />
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="w-1/2">
                    <p className="text-xs font-normal">Level</p>
                  </div>
                  <div className="w-1/2 flex flex-row items-center justify-between px-4 py-3 rounded-xl bg-[#EDEDED]">
                    <p className="text-xs font-normal">{level}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[820px] flex flex-col justify-between items-center font-dm pb-24"></div>
      </div>
      {visibleModal && (
        <PopupModal
          icon="profile"
          message={message}
          header="profile"
          onClose={() => {
            setVisibleModal(false);
            if (!isError) {
              setEdit(false);
              fetchUser();
            }
          }}
        />
      )}
    </>
  );
};

export default Profile;
