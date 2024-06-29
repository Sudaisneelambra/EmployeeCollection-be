	const designation = require("../../models/designation");
	const location = require("../../models/location");
	const users = require("../../models/user");
	const bcrypt = require("bcrypt");

	const emails = require("../../utils/email");

	/**adding the designation */
	const addDesignation = async (req, res) => {
	try {
		const { designationName } = req.body;
		const inLowerCaseWithSpaces = designationName.toLowerCase();
		const strippedName = inLowerCaseWithSpaces.replace(/\s+/g, "");
		const existing = await designation.findOne({
		$expr: {
			$eq: [
			{
				$toLower: {
				$replaceAll: {
					input: "$designationName",
					find: " ",
					replacement: "",
				},
				},
			},
			strippedName,
			],
		},
		});
		if (existing) {
		res.status(409).json({
			success: false,
			message: "Designation already exists",
		});
		} else {
		const newObject = new designation({
			designationName: inLowerCaseWithSpaces,
		});
		const saved = await newObject.save();
		if (saved) {
			res.status(200).json({
			success: true,
			message: "Designation added successfully",
			});
		} else {
			res.status(409).json({
			success: false,
			message: "Designation not added",
			});
		}
		}
	} catch (err) {
		res.status(404).json({
		success: false,
		message: "Designation not added",
		});
	}
	};

	/**adding the location */
	const addLocation = async (req, res) => {
	try {
		const { locationName } = req.body;
		const inLowerCaseWithSpaces = locationName.toLowerCase();
		const strippedName = inLowerCaseWithSpaces.replace(/\s+/g, "");
		const existing = await location.findOne({
		$expr: {
			$eq: [
			{
				$toLower: {
				$replaceAll: {
					input: "$locationName",
					find: " ",
					replacement: "",
				},
				},
			},
			strippedName,
			],
		},
		});
		if (existing) {
		res.status(409).json({
			success: false,
			message: "location already exists",
		});
		} else {
		const newObject = new location({
			locationName: inLowerCaseWithSpaces,
		});
		const saved = await newObject.save();
		if (saved) {
			res.status(200).json({
			success: true,
			message: "location added successfully",
			});
		} else {
			res.status(409).json({
			success: false,
			message: "location not added",
			});
		}
		}
	} catch (err) {
		res.status(404).json({
		success: false,
		message: "location not added",
		});
	}
	};

	/**add users */
	const addUser = async (req, res) => {
	try {
		const {
		name,
		age,
		phoneNumber,
		address,
		userId,
		email,
		password,
		designation,
		location,
		} = req.body;
		const user = await users.findOne({ email });
		if (user) {
		res.status(409).json({
			success: false,
			message: "User already exists",
		});
		} else {
		const user = await users.findOne({ userId });
		if (user) {
			res.status(409).json({
			success: false,
			message: "UserId is not unique, please generate again and submit",
			});
		} else {
			emails(email, "Admin verification Mail", name, password, userId)
			.then(async () => {
				console.log("suucessfully mail sended");
				const bcryptpassword = await bcrypt.hash(password, 10);
				const newUser = new users({
				name,
				age,
				phoneNumber,
				address,
				userId,
				email,
				password: bcryptpassword,
				designation,
				location,
				});
				await newUser.save();
				res.status(200).json({
				success: true,
				message: "user added successfully",
				});
			})
			.catch((err) => {
				console.log(`errr ${err}`);
				res.status(400).json({
				message: "email send failed",
				});
			});
		}
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
		success: false,
		message: "mail send failed",
		});
	}
	};

	/**delete User */
	const deleteUser = async (req, res) => {
	try {
		const id = req.query.id;
		const user = await users.updateOne(
		{ _id: id },
		{ $set: { delateStatus: true } }
		);
		if (user) {
		res.status(200).json({
			success: true,
			message: "user deleted successfully",
		});
		} else {
		res.status(404).json({
			success: false,
			message: "user not found",
		});
		}
	} catch (err) {
		console.log(err);
		res.status(404).json({
		success: false,
		message: "user delete failed",
		});
	}
	};

	const editUser = async(req, res) =>{
	try{
		const {
		id,
		name,
		age,
		phoneNumber,
		address,
		userId,
		email,
		password,
		designation,
		location,
		} = req.body;
		
		const user = await users.findOne({_id:id})
		if(!user){
			return res.status(404).json({success: false, message: "user not found"})
		} else {
			user.name=name
			user.age=age
			user.phoneNumber=phoneNumber
			user.address=address
			user.email=email
			user.userId=userId
			user.password=password
			user.designation=designation
			user.location=location
			const updatedUser = await user.save()
			if(updatedUser){
				res.status(200).json({success: true, message: "user updated successfully"})
			}
		}

	}
	catch(err){
		console.log(err)
		res.status(404).json({
			success: false,
			message: "user update failed",
		})
	}
	}


	module.exports = {
	addDesignation,
	addLocation,
	addUser,
	deleteUser,
	editUser
	};
