export const message = {
    html: async (name,password,regnumber) => `<div style="border: 5px blue solid;width: 100%;">
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
    </div>`}