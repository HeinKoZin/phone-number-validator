export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'edge';

// Define the prefixes and lengths for each telecom operator
const MPT = [{ prefix: "0920", length: 9 }, { prefix: "0921", length: 9 }, { prefix: "0922", length: 9 }, { prefix: "0923", length: 9 }, { prefix: "0924", length: 9 }, { prefix: "0925", length: 11 }, { prefix: "0926", length: 11 }, { prefix: "0940", length: 11 }, { prefix: "0941", length: 10 }, { prefix: "0942", length: 11 }, { prefix: "0943", length: 10 }, { prefix: "0944", length: 11 }, { prefix: "0945", length: 11 }, { prefix: "0947", length: 10 }, { prefix: "0948", length: 11 }, { prefix: "0949", length: 10 }, { prefix: "0950", length: 9 }, { prefix: "0951", length: 9 }, { prefix: "0952", length: 9 }, { prefix: "0953", length: 9 }, { prefix: "0954", length: 9 }, { prefix: "0955", length: 9 }, { prefix: "0956", length: 9 }, { prefix: "0973", length: 10 }, { prefix: "0983", length: 9 }, { prefix: "0985", length: 9 }, { prefix: "0986", length: 9 }, { prefix: "0987", length: 9 }, { prefix: "0988", length: 11 }, { prefix: "0989", length: 11 }, { prefix: "0991", length: 10 }];
const ATOM = [{ prefix: "0974", length: 11 }, { prefix: "0975", length: 11 }, { prefix: "0976", length: 11 }, { prefix: "0977", length: 11 }, { prefix: "0978", length: 11 }, { prefix: "0979", length: 11 }];
const OOREDOO = [{ prefix: "0994", length: 11 }, { prefix: "0995", length: 11 }, { prefix: "0996", length: 11 }, { prefix: "0997", length: 11 }, { prefix: "0998", length: 11 }, { prefix: "0999", length: 11 }];
const MEC = [{ prefix: "0930", length: 10 }, { prefix: "0931", length: 10 }, { prefix: "0932", length: 10 }, { prefix: "0933", length: 10 }, { prefix: "0934", length: 11 }, { prefix: "0935", length: 11 }, { prefix: "0936", length: 10 }];
const MYTEL = [{ prefix: "0965", length: 11 }, { prefix: "0966", length: 11 }, { prefix: "0967", length: 11 }, { prefix: "0968", length: 11 }, { prefix: "0969", length: 11 }];

// Function to validate the phone number and identify the operator
function validatePhoneNumber(phoneNumber: string) {
  // Check if the phone number is valid
  const prefix = [...MPT, ...ATOM, ...OOREDOO, ...MEC, ...MYTEL].find((item: any) => phoneNumber.startsWith(item.prefix));
  if (!prefix || phoneNumber.length !== prefix.length) return { valid: false, operator: null };

  // Check which operator the number belongs to
  let operator = null;
  let operator_code = null;

  if (MPT.some(item => phoneNumber.startsWith(item.prefix))) {
    operator = "MPT";
    operator_code = 100;

  } else if (ATOM.some(item => phoneNumber.startsWith(item.prefix))) {
    operator = "ATOM";
    operator_code = 102;

  } else if (OOREDOO.some(item => phoneNumber.startsWith(item.prefix))) {
    operator = "OOREDOO";
    operator_code = 101;
  } else if (MEC.some(item => phoneNumber.startsWith(item.prefix))) {
    operator = "MEC";
    operator_code = 103
  } else if (MYTEL.some(item => phoneNumber.startsWith(item.prefix))) {
    operator = "MYTEL";
    operator_code = 104
  }
  return { valid: true, operator, operator_code };
}



export function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return Response.json({ success: false, message: "Phone number is required!" });
  }

  const { valid, operator, operator_code } = validatePhoneNumber(phone ?? '');
  return Response.json({ operator, operator_code, valid, success: true, message: "Phone operator is return." });
}
