import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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
        publishedAt: '2020',
      },
      {
        name: '	Tuổi trẻ đáng giá bao nhiêu',
        bookTypeId: 2,
        publisherId: 3,
        author: 'Rosie Nguyễn',
        publishedAt: '2020',
      },
      {
        name: 'Bí mật ngôn ngữ cơ thể',
        bookTypeId: 1,
        publisherId: 3,
        author: 'Thierry Séchan',
        publishedAt: '2020',
      },
      {
        name: '	Cafe cùng Tony',
        bookTypeId: 3,
        publisherId: 5,
        author: 'Thierry Séchan',
        publishedAt: '2020',
      },
      {
        name: 'Khéo ăn nói sẽ có được thiên hạ',
        bookTypeId: 1,
        publisherId: 2,
        author: 'Dale Carnegie',
        publishedAt: '2020',
      },
      {
        name: '	Sức mạnh tiềm thức',
        bookTypeId: 5,
        publisherId: 2,
        author: 'Thierry Séchan',
        publishedAt: '2020',
      },
      {
        name: 'Lập bản đồ tư duy',
        bookTypeId: 5,
        publisherId: 5,
        author: 'Tony Buzan',
        publishedAt: '2020',
      },
      {
        name: 'Bạn đắt giá bao nhiêu',
        bookTypeId: 3,
        publisherId: 2,
        author: 'Vãn Tình',
        publishedAt: '2020',
      },
      {
        name: 'Nghĩ giàu làm giàu',
        bookTypeId: 6,
        publisherId: 3,
        author: 'Napoleon Hill',
        publishedAt: '2020',
      },
      {
        name: 'Cảm xúc - kẻ thù số 1 của thành công',
        bookTypeId: 5,
        publisherId: 2,
        author: 'Lê Thẩm Dương',
        publishedAt: '2020',
      },
      {
        name: 'Thời thơ ấu của các tổng thống Mỹ',
        bookTypeId: 7,
        publisherId: 6,
        author: 'David Stabler',
        publishedAt: '2020',
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
