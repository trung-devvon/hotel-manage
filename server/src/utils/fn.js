function removeVietnameseAccents(str) {
    const accents = [
      /[\u0300-\u036f]/g, // Combining Diacritical Marks
      /đ/g, /Đ/g,
      /[àáạảãâầấậẩẫăằắặẳẵ]/g, /[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g,
      /[èéẹẻẽêềếệểễ]/g, /[ÈÉẸẺẼÊỀẾỆỂỄ]/g,
      /[ìíịỉĩ]/g, /[ÌÍỊỈĨ]/g,
      /[òóọỏõôồốộổỗơờớợởỡ]/g, /[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g,
      /[ùúụủũưừứựửữ]/g, /[ÙÚỤỦŨƯỪỨỰỬỮ]/g,
      /[ỳýỵỷỹ]/g, /[ỲÝỴỶỸ]/g
    ];
    
    const nonAccents = [
      '', 'd', 'D',
      'a', 'A',
      'e', 'E',
      'i', 'I',
      'o', 'O',
      'u', 'U',
      'y', 'Y'
    ];
  
    let result = str;
    for (let i = 0; i < accents.length; i++) {
      result = result.replace(accents[i], nonAccents[i]);
    }
    
    return result;
  }
module.exports = {
    removeVietnameseAccents
}