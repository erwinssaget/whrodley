exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        // {
        //   first_name: 'Whrodley',
        //   last_name: 'Dev',
        //   email: 'instructor@whrodley.com',
        //   password:
        //     '$argon2i$v=19$m=4096,t=3,p=1$QtEcMuDgW+BdpGfIJLeI5A$3sn+rbw3WZBA4hOhy+TwuFXC6ZJOOrZoEMCR5Nhfq5E', // password
        //   created_at: new Date().toISOString(),
        //   updated_at: new Date().toISOString(),
        // },
      ]);
    });
};
