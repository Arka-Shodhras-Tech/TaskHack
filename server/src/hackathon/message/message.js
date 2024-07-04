export const message = {
    html: async (name, password, regnumber) => `
    <div style="border: 5px #be94de solid;width: 100%;border-radius:25px">
        <p style="text-align: center;font-family:Papyrus;color:  #b47ede;font-weight:bolder;font-size:30px">VEDIC VISION HACKATHON
        </p>
        <div style="text-align: center; font-family:Garamond;font-size:20px">
           Welcome to the Vedic Vision Hackathon, ${name}!
        </div>
        <div style="text-align: center;margin-top:40px;font-family:Georgia ">
          <h4> Here are your login details</h4>
          <h2>User ID: <mark style="background-color:#dbd7de;border-radius:5px">${regnumber}</mark></h2>
            <h2>Password: <mark style="background-color:#dbd7de;border-radius:5px">${password}</mark></h2>
        </div>
        <br />
        <div style="text-align: center;">
            <h4> <a href='https://asthack.me/bootcamp/login'
                    style="color:grey;text-decoration:none;">Login Here</a></h4>
        </div>
        <p style="text-align: center;font-family:Georgia;margin-top:20px">For any queries, contact us at <a href="mailto:hackathon@ast-admin.in">hackathon@ast-admin.in</a> or call us at +91 6302423327 </p>
           <p style="text-align:center;color:">Team AST</p>
    </div>
`,

    otp: async (name, otp, email) => `
    <div style="border: 5px #be94de solid;width: 100%;border-radius:25px">
        <p>
        <h4 style="text-align: center;">New <b>Message</b> From Team AST</h4>
        </p>
        <p>
        <h1 style="text-align: center;">VEDIC VISION HACKATHON</h1>
        </p>
        <div style="text-align: center;">
            Welcome to Vedic Vision Hackathon, ${name}!
            <br />
            <h3>Your password update details</h3>
        </div>
        <div style="text-align: center;">
            <h1>Your E-mail: ${email}</h1>
            <h1>Your OTP: ${otp}</h1>
        </div>
        <br />
        <p style="text-align: center;font-family:Georgia;margin-top:20px">For any queries, contact us at <a href="mailto:hackathon@ast-admin.in">hackathon@ast-admin.in</a> or call us at +91 6302423327 </p>
        <p style="text-align:center;color:">Team AST</p>

    </div>
    `,

    sendlink: async (name, reg) => `
    <div style="border: 5px #be94de solid;width: 100%; border-radius:25px">
        <p>
        <h4 style="text-align: center;">New <b>Message</b> From Team AST</h4>
        </p>
        <p>
        <h1 style="text-align: center;">VEDIC VISION HACKATHON</h1>
        </p>
        <div style="text-align: center;">
            Welcome to Vedic Vision Hackathon, ${name}!
            <br />
            <h3>Your login details</h3>
        </div>
        <div style="text-align: center;">
            <h1>Your ID: ${reg}</h1>
        </div>
        <br />
        <div style="text-align: center;">
            <h3>Password update link: <a href='https://asthack.me/bootcamp/updateform' style="color:black;">Click Here</a></h3>
        </div>
        <p style="text-align: center;font-family:Georgia;margin-top:20px">For any queries, contact us at <a href="mailto:hackathon@ast-admin.in">hackathon@ast-admin.in</a> or call us at +91 6302423327 </p>
        <p style="text-align:center;color:">Team AST</p>

    </div>`
}
