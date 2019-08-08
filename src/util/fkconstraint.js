module.exports = async (model, id) => {
			const found = await model.findById(id);
			if(!found)
				throw (new Error(`FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`));

			return true;
};