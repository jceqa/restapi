import User from '../src/users/models/users.model.js';
import {expect} from "chai";
describe("User Service Unit Tests", function () {
  describe("Save User functionality", function () {
    it("Should successfully add a user", async function () {
      const firstName = 'Roberto';
      const lastName = 'Gomez';
      const email = 'rgomez@gmail.com';
      const password = '12345';
      const permissionLevel = 1;

      const savedUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        permissionLevel
      })

      expect(savedUser.firstName).to.equal(firstName);
      expect(savedUser.lastName).to.equal(lastName);
      expect(savedUser.email).to.equal(email);
      expect(savedUser.permissionLevel).to.equal(permissionLevel);
    });
    it("Should get the inserted user", async function () {
      const user = await User.findOne({email: 'rgomez@gmail.com'});
      expect(user.firstName).to.equal("Roberto");
      expect(user.lastName).to.equal("Gomez");
      expect(user.email).to.equal("rgomez@gmail.com");
      expect(user.permissionLevel).to.equal(1);
    });
    it("Should update the inserted user", async function () {
      let user = await User.findOne({email: 'rgomez@gmail.com'});
      const lastName = "Gomez Bolaños";
      user.lastName = lastName;
      user = await user.save(user);

      expect(user.lastName).to.equal("Gomez Bolaños");
    });
    it("Should delete the inserted user", async function () {
      let user = await User.findOne({email: 'rgomez@gmail.com'});
      await user.remove();

      user = await User.findOne({email: 'rgomez@gmail.com'});

      expect(user).to.equal(null);
    });

  });
});
