import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.admin.createMany({
    data: [
      {
        username: 'admin',
        email: 'Admin@library.com',
        password: 'password',
        name: 'Admin',
        role: 'ADMIN',
      },
      {
        username: 'librarian',
        email: 'Librarian@library.com',
        password: 'password',
        name: 'Librarian',
        role: 'LIBRARIAN',
      },
    ],
  });

  await prisma.bookType.createMany({
    data: [
      {
        name: 'Lịch sử',
      },
      {
        name: 'Thiếu nhi',
      },
      {
        name: 'Bí ẩn',
      },
      {
        name: 'Giả tưởng và khoa học viễn tưởng',
      },
      {
        name: 'Sách truyền cảm hứng',
      },
      {
        name: 'Tiểu sử, tự truyện và hồi ký',
      },
      {
        name: 'Truyện ngắn',
      },
      {
        name: 'Giáo trình',
      },
      {
        name: 'Văn hóa xã hội – Lịch sử',
      },
      {
        name: 'Khoa học công nghệ – Kinh tế',
      },
      {
        name: 'Chính trị – pháp luật',
      },
      {
        name: 'Văn học nghệ thuật',
      },
    ],
  });

  await prisma.publisher.createMany({
    data: [
      {
        name: 'Nhà xuất bản Trẻ',
      },
      {
        name: 'Nhà xuất bản Kim Đồng',
      },
      {
        name: 'Nhà xuất bản Tổng hợp thành phố Hồ Chí Minh',
      },
      {
        name: 'Nhà xuất bản Hội Nhà văn',
      },
      {
        name: 'Nhà xuất bản Chính trị quốc gia Sự thật',
      },
      {
        name: 'Nhà xuất bản Phụ nữ Việt Nam',
      },
      {
        name: 'Nhà xuất bản Lao Động',
      },
      {
        name: 'Nhà xuất bản Văn học',
      },
      {
        name: 'Nhà xuất bản Tri thức',
      },
      {
        name: 'Nhà xuất bản Giáo dục',
      },
      {
        name: 'Nhà xuất bản Tôn giáo',
      },
      {
        name: 'Nhà xuất bản Từ điển bách khoa',
      },
    ],
  });

  await prisma.policy.create({
    data: {
      minAge: 16,
      maxAge: 65,
      cardReaderDuration: 6,
      bookDate: 8,
      maxBooks: 5,
      maxDate: 4,
    },
  });

  await prisma.book.createMany({
    data: [
      {
        name: 'Một tuần trong đời tỷ phú',
        bookTypeId: 1,
        publisherId: 2,
        author: 'Thierry Séchan',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date()
      },
      {
        name: '	Tuổi trẻ đáng giá bao nhiêu',
        bookTypeId: 2,
        publisherId: 3,
        author: 'Rosie Nguyễn',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Bí mật ngôn ngữ cơ thể',
        bookTypeId: 1,
        publisherId: 3,
        author: 'Thierry Séchan',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: '	Cafe cùng Tony',
        bookTypeId: 3,
        publisherId: 5,
        author: 'Thierry Séchan',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Khéo ăn nói sẽ có được thiên hạ',
        bookTypeId: 1,
        publisherId: 2,
        author: 'Dale Carnegie',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: '	Sức mạnh tiềm thức',
        bookTypeId: 5,
        publisherId: 2,
        author: 'Thierry Séchan',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Lập bản đồ tư duy',
        bookTypeId: 5,
        publisherId: 5,
        author: 'Tony Buzan',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Bạn đắt giá bao nhiêu',
        bookTypeId: 3,
        publisherId: 2,
        author: 'Vãn Tình',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Nghĩ giàu làm giàu',
        bookTypeId: 6,
        publisherId: 3,
        author: 'Napoleon Hill',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Cảm xúc - kẻ thù số 1 của thành công',
        bookTypeId: 5,
        publisherId: 2,
        author: 'Lê Thẩm Dương',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
      {
        name: 'Thời thơ ấu của các tổng thống Mỹ',
        bookTypeId: 7,
        publisherId: 6,
        author: 'David Stabler',
        publishedAt: 2020,
        borrowed: false,
        receivingDate: new Date(),
      },
    ],
  });

  await prisma.reader.createMany({
    data: [
      {
        name: 'Mai Thị Hằng Thư (HẾT HẠN)',
        email: 'Thumnh@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2022-05-03T18:03:55.638Z',
      },
      {
        name: 'Mai Thị Hằng Thư (CÒN HẠN)',
        email: 'Anhvtm@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2002-01-01',
        type: 'STUDENT',
        expiredAt: '2023-08-06T18:03:55.638Z',
      },
      {
        name: 'Đinh Công Thế Anh',
        email: 'Anhdct@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '1990-01-01',
        type: 'TEACHER',
        expiredAt: '2023-09-03T18:03:55.638Z',
      },
      {
        name: 'Võ Thuận Minh Đạt',
        email: 'Datvtm@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Nguyễn Quốc Huy',
        email: 'Huynq@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2006-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Nguyễn Thị Trà My',
        email: 'Myntt@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Ngô Ý Nhi',
        email: 'Nhiny@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Nguyễn Lê Thiên Phúc ',
        email: 'Phucnlt@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Lê Đình Thảo',
        email: 'Thaold@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2004-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Bùi Minh Thư',
        email: 'Thubm@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2002-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Nguyễn Đặng Anh Thương',
        email: 'Thuongnda@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Hồ Nam Việt',
        email: 'Viethm@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '2000-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
      {
        name: 'Trịnh Nguyễn Ngọc Trâm',
        email: 'Tramtnn@library.com',
        address: 'TP. Hồ Chí Minh',
        dob: '1999-01-01',
        type: 'STUDENT',
        expiredAt: '2023-05-03T18:03:55.638Z',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
