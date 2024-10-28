import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Admin/Navbar";
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
              <div className="w-full flex flex-col items-start justify-center pb-6">
                <p className="text-sm font-semibold">Personal Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  name, gender, civil status etc.
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">First Name</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Middle Name</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="first name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Last Name</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Birth Date</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="date"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="last name"
                    value={formattedBirthDate}
                    onChange={onDateChange}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Gender</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end space-x-2">
                  <p className="text-xs font-normal">{gender}</p>

                  <RiRefreshLine
                    size={16}
                    color="black"
                    className="cursor-pointer"
                    onClick={edit ? handleGenderToggle : null}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Civil Status</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end space-x-2">
                  <p className="text-xs font-normal">{civilStatus}</p>

                  <RiRefreshLine
                    size={16}
                    color="black"
                    className="cursor-pointer"
                    onClick={edit ? handleStatusToggle : null}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Nationality</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex flex-col items-start justify-center pb-6">
                <p className="text-sm font-semibold">Contact Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  address and phone number
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">House Number</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs capitalize"
                    placeholder="house number"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Street</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Barangay</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="barangay"
                    value={brgy}
                    onChange={(e) => setBrgy(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">City</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Phone Number</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
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
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex flex-col items-start justify-center pb-6">
                <p className="text-sm font-semibold">Economic Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  occupation and employment
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Employment Status</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs capitalize"
                    placeholder="employment status"
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Occupation</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex flex-col items-start justify-center pb-6">
                <p className="text-sm font-semibold">Credentials</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  email, password etc.
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Email</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Password</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="password"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={edit ? false : true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between pb-4">
                <div className="w-1/2 flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Level</p>
                </div>
                <div className="w-1/2 flex flex-row items-center justify-end">
                  <input
                    type="text"
                    className="outline-none border-none bg-[#FAFAFA] text-right text-xs capitalize"
                    placeholder="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    readOnly={edit ? false : true}
                  />
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
