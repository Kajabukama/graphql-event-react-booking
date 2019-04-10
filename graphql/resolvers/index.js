const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const events = async eventIds => {
	try {
		const events = await Event.find({ _id: { $in: eventIds } });
		return events.map(event => {
			return {
				...event._doc,
				_id: event.id,
				date: new Date(event._doc.date).toISOString(),
				creator: user.bind(this, event.creator)
			};
		});
	} catch (error) {
		throw error
	}
}

const user = async userId => {
	try {
		const user = await User.findById(userId)
		return {
			...user._doc,
			_id: user.id,
			createdEvents: events.bind(this, user._doc.createdEvents)
		};
	} catch (error) {
		throw error
	}
}

module.exports = {
	events: async () => {
		const events = await Event.find()
		try {
			return events.map(event => {
				return {
					...event._doc,
					_id: event.id,
					date: new Date(event._doc.date).toISOString(),
					creator: user.bind(this, event._doc.creator)
				}
			})
		} catch (error) {
			throw error
		}
	},

	bookings: async () => {
		try {
			const bookings = await Booking.find();
			return bookings.map(booking => {
				return {
					...booking._doc, 
					_id: booking.id, 
					createdAt: new Date(booking._doc.createdAt).toISOString(), 
					updatedAt: new Date(booking._doc.updatedAt).toISOString()
				}
			})
		}catch(err){
			throw err
		}
	},

	users: async () => {
		try {
			const users = await User.find()
			return users.map(user => {
				return {
					...user._doc,
					_id: user.id,
					createdEvents: events.bind(this, user._doc.createdEvents)
				}
			})
		} catch (error) {
			throw error;
		}
	},
	createEvent: async args => {
		const event = new Event({
			title: args.eventInput.title,
			place: args.eventInput.place,
			description: args.eventInput.description,
			price: +args.eventInput.price,
			date: new Date().toISOString(),
			creator: "5cac94880b982021470b6e26"
		});
		let createdEvent;
		try {
			const result = await event.save();
			createdEvent = {
				...result._doc,
				_id: result._doc._id.toString(),
				date: new Date(event._doc.date).toISOString(),
				creator: user.bind(this, result._doc.creator)
			};

			const creator = await User.findById('5cac94880b982021470b6e26');

			if (!creator) {
				throw new Error('User does not exists');
			}

			creator.createdEvents.push(event);
			await creator.save()
			return createdEvent;

		} catch (error) {
			throw error
		}
	},

	createUser: async args => {
		try {
			const checkUser = await User.findOne({ email: args.userInput.email })
			if (checkUser) {
				throw new Error('Sorry, user exists already');
			}
			const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
			const user = new User({
				firstname: args.userInput.firstname,
				lastname: args.userInput.lastname,
				mobile: args.userInput.mobile,
				username: args.userInput.username,
				email: args.userInput.email,
				role: args.userInput.role,
				password: hashedPassword,
				create_on: args.userInput.create_on
			})

			const result = await user.save();
			return { ...result._doc, password: null, _id: result.id }

		} catch (error) {
			throw error
		}
	}
}