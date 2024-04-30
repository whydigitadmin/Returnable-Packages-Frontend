import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { encryptPassword } from "../user/components/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0d6ef",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

// function NewCompany({ newCompany, companyEditId }) {
function NewCompany({ newCompany, companyEditId }) {
    const [companyCode, setCompanyCode] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [adminEmail, setAdminEmail] = React.useState("");
    const [adminPwd, setAdminPwd] = React.useState("");
    const [logo, setLogo] = React.useState("");
    const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));





    const [firstName, setFirstName] = React.useState("");
    // const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const [address, setAddress] = React.useState("");
    // const [city, setCity] = React.useState("");
    // const [state, setState] = React.useState("");
    // const [country, setCountry] = React.useState("");
    // const [pincode, setPincode] = React.useState("");
    const [active, setActive] = React.useState(true);
    const [role, setRole] = React.useState("ROLE_USER");
    const [warehouse, setWarehouse] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [openShippingModal, setOpenShippingModal] = React.useState(false);
    const [warehouseLocationVO, setWarehouseLocationVO] = useState([]);
    const [userData, setUserData] = useState({});
    const [disabledWarehouseIds, setDisabledWarehouseIds] = useState([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleShippingClickOpen = () => {
        setOpenShippingModal(true);
    };
    const handleShippingClickClose = () => {
        setOpenShippingModal(false);
    };

    useEffect(() => {
        if (companyEditId) {
            getUserById();
        }
        getWarehouseLocationList();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/auth/user/${companyEditId}`
            );

            if (response.status === 200) {
                const userData = response.data.paramObjectsMap.userVO;
                setUserData(userData);
                console.log("Edit User Details", userData);
                setFirstName(userData.firstName);
                setEmail(userData.email);
                setAddress(userData.userAddressVO.address1);
                setCity(userData.userAddressVO.city);
                setState(userData.userAddressVO.state);
                setCountry(userData.userAddressVO.country);
                setPincode(userData.userAddressVO.pin);
                setPhone(userData.pno);
                // Set warehouse data
                const userWarehouses = userData.accessWarehouse || [];
                setWarehouse(userWarehouses);
                // setDisabledWarehouseIds(userWarehouses); // Uncomment if needed
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // UPDATE COMPANY
    const handleUpdateCompany = () => {
        const errors = {};
        if (!firstName) {
            errors.firstName = "First Name is required";
        }
        if (!email) {
            errors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            errors.email = "Invalid email format";
        }

        if (!phone) {
            errors.phone = "Phone is required";
        } else if (phone.length < 10) {
            errors.phone = "Phone number must be 10 Digit";
        }
        if (!address) {
            errors.address = "Address is required";
        }
        if (!city) {
            errors.city = "City is required";
        }
        if (!state) {
            errors.state = "State is required";
        }
        if (!country) {
            errors.country = "Country is required";
        }
        if (!pincode) {
            errors.pincode = "Pincode is required";
        } else if (pincode.length < 6) {
            errors.pincode = "Pincode must be 6 Digit";
        }
        // if (!warehouse) {
        //   errors.warehouse = "Warehouse is required";
        // }
        const userPayload = {
            accessRightsRoleId: 2,
            accessWarehouse: warehouse,
            // accessaddId: 0,
            active: active,
            email: email,
            emitterId: 0,
            firstName: firstName,
            orgId: orgId, // You may need to provide a default value
            role: role,
            pno: phone,
            userAddressDTO: {
                address1: address,
                address2: "", // You may need to provide a default value
                country: country,
                location: "Location",
                pin: pincode,
                state: state,
                city: city,
            },
            userName: email,
            userId: companyEditId, // You may need to provide a default value
        };

        const token = localStorage.getItem("token");
        let headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
        }

        const hashedPassword = encryptPassword(password);

        console.log("Update Payload is:", userPayload);

        // const userDataWithHashedPassword = {
        //   ...userPayload,
        //   password: hashedPassword,
        // };

        if (Object.keys(errors).length === 0) {
            // Valid data, perform API call or other actions
            axios
                .put(
                    `${process.env.REACT_APP_API_URL}/api/auth/updateUser`,
                    userPayload,
                    { headers }
                )
                .then((response) => {
                    console.log("User Updated successfully!", response.data);
                    // toast.success("User updated successfully!");
                    toast.success("User updated successfully!", {
                        autoClose: 2000,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        newCompany(false);
                    }, 3000); // Adjust the delay time as needed
                })
                .catch((error) => {
                    console.error("Error saving user:", error.message);
                    toast.error("Failed to update user. Please try again.");
                });
        } else {
            setErrors(errors);
        }
    };

    const getWarehouseLocationList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/warehouse/getWarehouseLocationByOrgID?orgId=${orgId}`
            );

            if (response.status === 200) {
                setWarehouseLocationVO(response.data.paramObjectsMap.WarehouseLocation);
                console.log(
                    "WarehouseLocation",
                    response.data.paramObjectsMap.WarehouseLocation
                );
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleLocationChange = (warehouselocation, isChecked) => {
        setWarehouse((prevWarehouse) => {
            console.log("Previous Warehouse:", prevWarehouse);
            if (
                Array.isArray(prevWarehouse) &&
                isChecked &&
                !prevWarehouse.includes(warehouselocation)
            ) {
                // Add warehouseId to the array if it's not already present
                return [...prevWarehouse, warehouselocation];
            } else if (Array.isArray(prevWarehouse) && !isChecked) {
                // Remove warehouseId from the array
                return prevWarehouse.filter((id) => id !== warehouselocation);
            }
            // Return the unchanged array if isChecked is true and warehouseId is already present
            return prevWarehouse;
        });
    };

    // In the Assign Warehouse DialogContent

    function isValidEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleNew = () => {
        setCompanyName("");
        setCompanyCode("")
        setEmail("");
        setPhone("")
        setAddress("");
        setCity("");
        setState("");
        setCountry("");
        setPincode("");
        setAdminEmail("")
        setAdminPwd("");
        setActive(true);
        setErrors({});
        // notify();
    };

    // SAVE COMPANY
    const handleSaveCompany = () => {
        const errors = {};
        if (!companyName) {
            errors.companyName = "Company Name is required";
        }
        if (!companyCode) {
            errors.companyCode = "Company Code is required";
        }
        if (!email) {
            errors.email = "Company Email is required";
        } else if (!isValidEmail(email)) {
            errors.email = "Invalid email format";
        }

        if (!phone) {
            errors.phone = "Phone is required";
        } else if (phone.length < 10) {
            errors.phone = "Phone number must be 10 Digit";
        }
        if (!address) {
            errors.address = "Address is required";
        }
        if (!city) {
            errors.city = "City is required";
        }
        if (!state) {
            errors.state = "State is required";
        }
        if (!country) {
            errors.country = "Country is required";
        }
        if (!pincode) {
            errors.pincode = "Pincode is required";
        } else if (pincode.length < 6) {
            errors.pincode = "Pincode must be 6 Digit";
        }
        if (!adminEmail) {
            errors.adminEmail = "Company Email is required";
        } else if (!isValidEmail(adminEmail)) {
            errors.adminEmail = "Invalid email format";
        }
        if (!adminPwd) {
            errors.adminPwd = "Password is required";
        }

        const token = localStorage.getItem("token");
        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
        }
        const hashedPassword = encryptPassword(adminPwd);

        // Update userData with the hashed password

        const userPayload = {
            accessRightsRoleId: 2,
            accessWarehouse: warehouse,
            // accessaddId: 0,
            active: active,
            email: email,
            emitterId: 0,
            firstName: firstName,
            orgId: orgId, // You may need to provide a default value
            role: role,
            pno: phone,
            userAddressDTO: {
                address1: address,
                address2: "", // You may need to provide a default value
                city: city,
                country: country,
                location: city,
                pin: pincode,
                state: state,
            },
            userName: email || "", // You may need to provide a default value
        };

        const userDataWithHashedPassword = {
            ...userPayload,
            password: hashedPassword,
        };

        if (Object.keys(errors).length === 0) {
            // Valid data, perform API call or other actions
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/auth/createUser`,
                    userDataWithHashedPassword,
                    { headers }
                )
                .then((response) => {
                    console.log("User saved successfully!", response.data);
                    // toast.success("User saved successfully!");
                    toast.success("User saved successfully!", {
                        autoClose: 2000,
                        theme: "colored",
                    });
                    handleNew();
                })
                .catch((error) => {
                    console.error("Error saving user:", error.message);
                    toast.error("Error saving user: " + error.message);
                });
        } else {
            setErrors(errors);
        }
    };

    // CLOSE BUTTON WITH CONFIRMATION
    const handleUserCreationClose = () => {
        if (
            firstName ||
            phone ||
            address ||
            city ||
            state ||
            country ||
            pincode ||
            warehouse > 0
        ) {
            setOpenConfirmationDialog(true);
        } else {
            setOpenConfirmationDialog(false);
            newCompany(false); // USER CREATION SCREEN CLOSE AFTER UPDATE
        }
    };

    const handleConfirmationClose = () => {
        setOpenConfirmationDialog(false);
    };

    const handleConfirmationYes = () => {
        setOpenConfirmationDialog(false);
        newCompany(false);
    };

    return (
        <>
            <div className="card w-full p-6 bg-base-100 shadow-xl">
                <div className="d-flex justify-content-end">
                    <IoMdClose
                        onClick={handleUserCreationClose}
                        className="cursor-pointer w-8 h-8 mb-3"
                    />
                </div>
                <div className="row">
                    {/* COMPANY NAME FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Name
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            name="name"
                            value={companyName}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase().replace(/[^\w\s@.-]+/g, "");
                            }}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        {errors.companyName && (
                            <span className="error-text">{errors.companyName}</span>
                        )}
                    </div>
                    {/* COMPANY CODE FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Code
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            // placeholder={"Enter"}
                            name="code"
                            value={companyCode}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase().replace(/[^\w\s@.-]+/g, "");
                            }}
                            onChange={(e) => setCompanyCode(e.target.value)}
                        />
                        {errors.companyCode && (
                            <span className="error-text">{errors.companyCode}</span>
                        )}
                    </div>
                    {/* COMPANY EMAIL FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Email
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            // placeholder={"Enter"}
                            name="email"
                            value={email}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase().replace(/[^\w\s@.-]+/g, "");
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={companyEditId ? true : false}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    {/* PHONE NO FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Phone No
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            type={"text"}
                            // placeholder={"Enter"}
                            name="phone"
                            value={phone}
                            maxLength={10}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase().replace(/\D/g, "");
                            }}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    {/* ADDRESS FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Address
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            // placeholder={"Enter"}
                            name="address"
                            value={address}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase();
                            }}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && (
                            <span className="error-text">{errors.address}</span>
                        )}
                    </div>
                    {/* COUNTRY FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Country
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select form-sz w-full mb-2"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            name="country"
                        >
                            <option value="" disabled>
                                Select country
                            </option>

                            {/* {countryData.length > 0 &&
                countryData.map((list) => (
                  <option key={list.id} value={list.country}>
                    {list.country}
                  </option>
                ))} */}
                        </select>
                        {errors.country && (
                            <span className="error-text">{errors.country}</span>
                        )}
                    </div>
                    {/* STATE FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                State
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select form-sz w-full mb-2"
                            onChange={(e) => setCountry(e.target.value)}
                            value={state}
                            name="state"
                        >
                            <option value="" disabled>
                                Select state
                            </option>

                            {/* {stateData.length > 0 &&
                stateData.map((list) => (
                  <option key={list.id} value={list.state}>
                    {list.state}
                  </option>
                ))} */}
                        </select>
                        {errors.state && (
                            <span className="error-text">{errors.state}</span>
                        )}
                    </div>
                    {/* CITY FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                City
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select form-sz w-full mb-2"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            name="city"
                        >
                            <option value="" disabled>
                                Select city
                            </option>

                            {/* {countryData.length > 0 &&
                countryData.map((list) => (
                  <option key={list.id} value={list.country}>
                    {list.country}
                  </option>
                ))} */}
                        </select>
                        {errors.city && (
                            <span className="error-text">{errors.city}</span>
                        )}
                    </div>
                    {/* PIN CODE FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Pincode
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            // placeholder={"Enter"}
                            name="pincode"
                            value={pincode}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase().replace(/\D/g, "");
                            }}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                        {errors.pincode && (
                            <span className="error-text">{errors.pincode}</span>
                        )}
                    </div>
                    {/* ADMIN EMAIL FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Admin Email
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            // placeholder={"Enter"}
                            name="email"
                            value={adminEmail}
                            onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase().replace(/[^\w\s@.-]+/g, "");
                            }}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            disabled={companyEditId ? true : false}
                        />
                        {errors.adminEmail && <span className="error-text">{errors.adminEmail}</span>}
                    </div>
                    {/* ADMIN PASSWORD FIELD */}
                    {!companyEditId && (
                        <>
                            <div className="col-lg-3 col-md-6 mb-2">
                                <label className="label">
                                    <span
                                        className={
                                            "label-text label-font-size text-base-content d-flex flex-row"
                                        }
                                    >
                                        Password
                                        <FaStarOfLife className="must" />
                                    </span>
                                </label>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-2">
                                <input
                                    className="form-control form-sz mb-2"
                                    type={"password"}
                                    // placeholder={"Enter"}
                                    name="adminPwd"
                                    value={adminPwd}
                                    // onInput={(e) => {
                                    //     e.target.value = e.target.value.toUpperCase().replace(/[^\w\s@.-]+/g, "");
                                    // }}
                                    onChange={(e) => setAdminPwd(e.target.value)}
                                />
                                {errors.adminPwd && (
                                    <span className="error-text">{errors.adminPwd}</span>
                                )}
                            </div>
                        </>
                    )}

                    {/* WAREHOUSE FIELD */}
                    {/* <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Warehouse
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <button
                            type="button"
                            onClick={handleShippingClickOpen}
                            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                            Assign Warehouse
                        </button>
                    </div> */}

                    {/* ACTIVE FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span className={"label-text label-font-size text-base-content"}>
                                Active
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                        />
                    </div>
                </div>
                <ToastContainer />
                {companyEditId ? (
                    <div className="d-flex flex-row mt-3">
                        <button
                            type="button"
                            onClick={handleUpdateCompany}
                            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <div className="d-flex flex-row mt-3">
                        <button
                            type="button"
                            onClick={handleSaveCompany}
                            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleNew}
                            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>
            {/* ASSIGN WAREHOUSE MODAL */}
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={openShippingModal}
                onClose={handleShippingClickClose}
            >
                <div className="d-flex justify-content-between">
                    <DialogTitle>Assign Warehouse</DialogTitle>
                    <IoMdClose
                        onClick={handleShippingClickClose}
                        className="cursor-pointer w-8 h-8 mt-3 me-3"
                    />
                </div>
                <DialogContent>
                    <DialogContentText className="d-flex flex-column">
                        <div className="row mb-3">
                            <div className="col-lg-12 col-md-12">
                                {warehouseLocationVO ? (
                                    <div>
                                        {" "}
                                        {warehouseLocationVO.map((location) => (
                                            <div className="form-check" key={location.warehouseId}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={location.warehouseId}
                                                    value={location.warehouseId}
                                                    // checked={warehouse.includes(location.warehouseId)}
                                                    checked={
                                                        Array.isArray(warehouse) &&
                                                        warehouse.includes(location.warehouseId)
                                                    }
                                                    disabled={
                                                        companyEditId && // Check if it's edit time
                                                        Array.isArray(warehouse) &&
                                                        warehouse.includes(location.warehouseId)
                                                    }
                                                    onChange={(e) =>
                                                        handleLocationChange(
                                                            location.warehouseId,
                                                            e.target.checked
                                                        )
                                                    }
                                                />

                                                <label
                                                    className="form-check-label"
                                                    htmlFor={location.warehouseId}
                                                >
                                                    {location.warehouseLocation}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <center>Flow Not Available!</center>{" "}
                                    </div>
                                )}
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="mb-2 me-2">
                    <Button onClick={handleShippingClickClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleShippingClickClose}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* CLOSE CONFIRMATION MODAL */}
            <Dialog open={openConfirmationDialog}>
                <DialogContent>
                    <p>Are you sure you want to close without saving changes?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmationClose}>No</Button>
                    <Button onClick={handleConfirmationYes}>Yes</Button>
                </DialogActions>
            </Dialog>
            {/* {openConfirmationDialog && (<CloseConfirmation open={openConfirmationDialog} close={handleConfirmationYes} no={handleConfirmationClose} />)} */}
        </>
    );
}

export default NewCompany;
