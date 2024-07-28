export const message = {
  html: async (name, password, regnumber) => `
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                <tr>
                    <td align="center" valign="top" style="background-color: #293845;">
                        <p
                            style="font-size:20px;color:white;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <b>Team AST<b>
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                <tr>
                    <td style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; text-align:center">
                        <h1
                            style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Welcome to the Vedic Vision Hackathon, ${name}!</h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
            <td align="center">
                <h4 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; line-height: 48px;"> Here
                    are your login details</h4>
            </td>
        </table>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 100%;">
                <tr>
                    <td align="center" bgcolor="#ffffff"
                        style="padding: 3px 3px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 4px;">
                        <h2>User ID: <mark style="background-color:#dbd7de;border-radius:5px">${regnumber}</mark></h2>
                        <h2>Password: <mark style="background-color:#dbd7de;border-radius:5px">${password}</mark></h2>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 15px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p style="margin: 0; padding-top: 10px; font-size:14px;">Login: <a
                                href="https://asthack.me/bootcamp/home" target="_blank">Click Here</a></p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding:36px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                        <p style="margin: 0;">Thank You,<br>Team AST</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#e9ecef"
                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                        <p style="margin: 0; font-size: 12px;">Team AST</p>
                        <p style="margin: 0; font-size: 12px;">Team AST, SRKREC</p>
                    </td>
                </tr>
`,

  otp: async (name, otp, email) => `
  <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                <tr>
                    <td align="center" valign="top" style="background-color: #293845;">
                        <p
                            style="font-size:20px;color:white;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <b>Team AST<b></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                <tr>
                    <td style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; text-align:center">
                        <h1
                            style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Welcome to Vedic Vision Hackathon, ${name}!</h1>
                            <h3>Your password update OTP</h3>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                <tr>
                    <td align="center" bgcolor="#ffffff"
                        style="padding: 3px 3px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 4px;">
                        <p><b style="color:#293845">Email:</b>${email}</p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" bgcolor="#293845" style="border-radius: 2px;">
                                                <h1
                                                    style="display: inline-block;text-align: center; padding: 5px 20px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 25px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                    ${otp}</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding:36px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                        <p style="margin: 0;">Thank You,<br>Team AST</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#e9ecef"
                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                        <p style="margin: 0; font-size: 12px;">Team AST</p>
                        <p style="margin: 0; font-size: 12px;">Team AST, SRKREC</p>
                    </td>
                </tr>
    `,

  sendlink: async (name, reg) => `
  <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                <tr>
                    <td align="center" valign="top" style="background-color: #293845;">
                        <p
                            style="font-size:20px;color:white;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <b>Team AST<b></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                <tr>
                    <td style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; text-align:center">
                        <h1
                            style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Welcome to Vedic Vision Hackathon, ${name}!</h1>
                          
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 100%;">
                <tr>
                    <td align="center" bgcolor="#ffffff"
                        style="padding: 3px 3px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 4px;">
                        <p><b style="color:#293845">Your ID: </b>${reg}</p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 15px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p style="margin: 0; padding-top: 10px; font-size:14px;">Password update Link: <br>
                        <button style="background-color:blue;padding:5px;border-radius:20px">
                        <a href="https://asthack.me/bootcamp/updateform"
                       style="color:white; text-decoration: none" target="_blank">Click Here</a>
                       </button>     
                        </p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding:36px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                        <p style="margin: 0;">Thank You,<br>Team AST</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#e9ecef"
                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                        <p style="margin: 0; font-size: 12px;">Team AST</p>
                        <p style="margin: 0; font-size: 12px;">Team AST, SRKREC</p>
                    </td>
                </tr>
`,

  sendTeamLoginDetails: (name, teamid, password, members) => `
 <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                <tr>
                    <td align="center" valign="top" style="background-color: #293845;">
                        <p style="font-size:20px;color:white;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <b>Team AST</b>
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                <tr>
                    <td style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; text-align:center">
                        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Welcome to Vedic Vision Hackathon,<span style="color:green"> Team ${name}! </span></h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
            <td align="center">
                <h4 style="margin: 0; font-size: 20px; font-weight: 700; line-height: 48px;">
                    Your Login details for Problem Statement Registration and for Hackathon</h4>
            </td>
        </table>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 100%;">
                <tr>
                    <td align="center" bgcolor="#ffffff"
                        style=" font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <h5>Your Team Name: ${name}</h5>
                        <h5>Your Team ID: ${teamid}</h5>
                        <h5>Your Team Password: ${password}</h5>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#ffffff"
                        style="padding: 3px 3px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <h5>Your team members' registration numbers</h5>
                        <div width="fit-content">
                        
                        <ol style="width:fit-content">
                            ${members
                              .map((member) => `<li >${member}</li>`)
                              .join("")}
                        </ol>
                        </div>
                        
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 15px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p style="margin: 0; padding-top: 10px; font-size:14px;">Login: <a href="https://asthack.me/problemstatements" target="_blank">Click Here</a></p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding:36px 13px 15px;text-align: center; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                        <p style="margin: 0;">Thank You,<br>Team AST</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" bgcolor="#e9ecef"
                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      
                        <p style="margin: 0; font-size: 12px;">Team AST, SRKREC</p>
                    </td>
                </tr>
    `,
};
