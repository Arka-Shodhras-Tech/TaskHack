export const message = {
    html: async (name, password, regnumber) => `<div style="border: 5px blue solid;width: 100%;">
        <p>
        <h4 style="text-align: center;">This <b>Message</b> From Team AST</h4>
        </p>
        <p>
        <h1 style="text-align: center;">VEDIC VISION HACKATHON</h1>
        </p>
        <div style="text-align: center;">
            Welcome to vedic vision hackathon ${name}
            <br />
            <h3>Your login details</h3>
        </div>
        <div style="text-align: center;">
            <h1>Your id :: ${regnumber}</h1>
            <h1>Your Password :: ${password}</h1>
        </div>
        <br />
        <div style="text-align: center;">
            <h3>Please login here :: <a href='https://asteam-attendance.vercel.app/scrummaster'
                    style="color:black;">Login Here</a></h3>
        </div>
    </div>`,

    otp: async (name, otp, email) => `<div style="border: 5px blue solid;width: 100%;">
        <p>
        <h4 style="text-align: center;">This <b>Message</b> From Team AST</h4>
        </p>
        <p>
        <h1 style="text-align: center;">VEDIC VISION HACKATHON</h1>
        </p>
        <div style="text-align: center;">
            Welcome to vedic vision hackathon ${name}
            <br />
            <h3>Your password update details</h3>
        </div>
        <div style="text-align: center;">
            <h1>Your Gmail :: ${email}</h1>
            <h1>Your OTP :: ${otp}</h1>
        </div>
        <br />
    </div>`,

    senlink: async (name,email) => `<div style="border: 5px blue solid;width: 100%;">
        <p>
        <h4 style="text-align: center;">This <b>Message</b> From Team AST</h4>
        </p>
        <p>
        <h1 style="text-align: center;">VEDIC VISION HACKATHON</h1>
        </p>
        <div style="text-align: center;">
            Welcome to vedic vision hackathon ${name}
            <br />
            <h3>Your login details</h3>
        </div>
        <div style="text-align: center;">
            <h1>Your id :: ${email}</h1>
        </div>
        <br />
        <div style="text-align: center;">
            <h3>Password update link :: <a href='https://asteam-attendance.vercel.app/scrummaster'
                    style="color:black;">click Here</a></h3>
        </div>
    </div>`
}