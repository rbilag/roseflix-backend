import { Document, Model, model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../constants';

type Profile = {
	_id: string;
	name: string;
	avatar: string;
};

export interface User {
	email: string;
	phone: string;
	password: string;
	profiles: Array<Profile>;
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {
	createUser(userDetails: User): Promise<UserDocument>;
	checkAvailability(value: string, type: string): boolean;
	getUserById(id: string): Promise<UserDocument>;
	getUsers(): Promise<UserDocument>;
	upsertProfile(id: string, newProfile: Profile): Promise<UserDocument>;
	deleteProfile(id: string, profileId: string): Promise<UserDocument>;
	findByLogin(login: string): Promise<UserDocument>;
	deleteUserById(id: string): Promise<UserDocument>;
}

const userSchema = new Schema<UserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		phone: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		profiles: [
			{
				_id: {
					type: String,
					default: () => nanoid()
				},
				name: {
					type: String,
					required: true
				},
				avatar: {
					type: String,
					required: true
				}
			}
		]
	},
	{ timestamps: true }
);

userSchema.statics.createUser = async function(this: Model<UserDocument>, userDetails: User) {
	try {
		const hash = await bcrypt.hash(userDetails.password, 10);
		userDetails.password = hash;
		return await this.create(userDetails);
	} catch (error) {
		throw error;
	}
};

userSchema.statics.checkAvailability = async function(this: Model<UserDocument>, value: string, type: string) {
	try {
		const existingUser = type === 'email' ? await this.findOne({ email: value }) : await this.findOne({ phone: value });
		return existingUser ? false : true;
	} catch (error) {
		throw error;
	}
};

userSchema.statics.getUserById = async function(this: Model<UserDocument>, id: string) {
	try {
		const user = await this.findOne({ _id: id }, { password: 0 });
		if (!user) throw { error: ERROR_MESSAGES.USER_NOT_FOUND };
		return user;
	} catch (error) {
		throw error;
	}
};

userSchema.statics.getUsers = async function(this: Model<UserDocument>) {
	try {
		return await this.find({}, { password: 0 });
	} catch (error) {
		throw error;
	}
};

userSchema.statics.upsertProfile = async function(this: Model<UserDocument>, id: string, newProfile: Profile) {
	try {
		const user = await this.findOne({ _id: id }, { password: 0 });
		if (!user) throw { error: ERROR_MESSAGES.USER_NOT_FOUND };
		if (newProfile._id) {
			const profileIndex = user.profiles.findIndex((profile) => profile._id === newProfile._id);
			user.profiles[profileIndex] = newProfile;
		} else {
			user.profiles.push({ ...newProfile });
		}
		return await user.save();
	} catch (error) {
		throw error;
	}
};

userSchema.statics.deleteProfile = async function(this: Model<UserDocument>, id: string, profileId: string) {
	try {
		const user = await this.findOne({ _id: id }, { password: 0 });
		if (!user) throw { error: ERROR_MESSAGES.USER_NOT_FOUND };
		const profileIndex = user.profiles.findIndex((profile) => profile._id === profileId);
		user.profiles.splice(profileIndex, 1);
		return await user.save();
	} catch (error) {
		throw error;
	}
};

userSchema.statics.findByLogin = async function(this: Model<UserDocument>, login: string) {
	try {
		let user = await this.findOne({ $or: [ { phone: login }, { email: login } ] });
		return user;
	} catch (error) {
		throw error;
	}
};

userSchema.statics.deleteUserById = async function(this: Model<UserDocument>, id: string) {
	try {
		return await this.findByIdAndDelete(id);
	} catch (error) {
		throw error;
	}
};

export default model<UserDocument, UserModel>('User', userSchema);
