import User from "./models/user";
import Registration from "./models/registration";
import Event from "./models/event";

const setUpAssociations = () => {
  User.hasMany(Registration, { foreignKey: "userId" });
  Registration.belongsTo(User, { foreignKey: "userId" });

  Event.hasMany(Registration, { foreignKey: "eventId" });
  Registration.belongsTo(Event, { foreignKey: "eventId" });
};
setUpAssociations();

export { User, Event, Registration };
