import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User } from '../../auth/entities/user.entity';
import { Category } from '../../products/entities/category.entity';
import { Product, ProductStatus } from '../../products/entities/product.entity';
import { NewsCategory } from '../../news/entities/news-category.entity';
import { Article, ArticleStatus } from '../../news/entities/article.entity';
import { Project, ProjectStatus } from '../../projects/entities/project.entity';
import { Role } from '../../common/decorators/roles.decorator';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'gese_fire_security',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected');

  // Users
  const userRepo = AppDataSource.getRepository(User);
  const existingAdmin = await userRepo.findOneBy({ email: 'admin@gesefiresecurity.vn' });
  if (!existingAdmin) {
    await userRepo.save([
      {
        email: 'admin@gesefiresecurity.vn',
        name: 'Super Admin',
        password: await bcrypt.hash('Admin@123', 10),
        role: Role.SUPER_ADMIN,
      },
      {
        email: 'editor@gesefiresecurity.vn',
        name: 'Editor',
        password: await bcrypt.hash('Editor@123', 10),
        role: Role.EDITOR,
      },
    ]);
    console.log('Users seeded');
  }

  // Product Categories
  const catRepo = AppDataSource.getRepository(Category);
  if ((await catRepo.count()) === 0) {
    await catRepo.save([
      { name: 'Đầu báo cháy', slug: 'dau-bao-chay', sortOrder: 1 },
      { name: 'Tủ trung tâm báo cháy', slug: 'tu-trung-tam-bao-chay', sortOrder: 2 },
      { name: 'Thiết bị chữa cháy', slug: 'thiet-bi-chua-chay', sortOrder: 3 },
      { name: 'Camera & An ninh', slug: 'camera-an-ninh', sortOrder: 4 },
      { name: 'Phụ kiện PCCC', slug: 'phu-kien-pccc', sortOrder: 5 },
    ]);
    console.log('Categories seeded');
  }

  // Products
  const productRepo = AppDataSource.getRepository(Product);
  if ((await productRepo.count()) === 0) {
    const cats = await catRepo.find();
    await productRepo.save([
      {
        name: 'Đầu báo khói quang điện GESE-SD01',
        slug: 'dau-bao-khoi-quang-dien-gese-sd01',
        sku: 'GESE-SD01',
        shortDescription: 'Đầu báo khói quang điện thế hệ mới, độ nhạy cao, ổn định.',
        description: '<p>Đầu báo khói quang điện GESE-SD01 sử dụng công nghệ tán xạ ánh sáng...</p>',
        specifications: { 'Nguồn': '24VDC', 'Dòng': '< 30μA', 'Nhiệt độ': '-10°C ~ 50°C', 'Chuẩn': 'EN 54-7' },
        price: 850000,
        status: ProductStatus.ACTIVE,
        categoryId: cats[0]?.id,
        seoTitle: 'Đầu báo khói quang điện GESE-SD01 | GESE Fire & Security',
      },
      {
        name: 'Đầu báo nhiệt cố định GESE-HD01',
        slug: 'dau-bao-nhiet-co-dinh-gese-hd01',
        sku: 'GESE-HD01',
        shortDescription: 'Đầu báo nhiệt cố định 57°C, chống bụi, phù hợp nhà kho.',
        specifications: { 'Ngưỡng': '57°C', 'Nguồn': '24VDC', 'IP': 'IP42' },
        price: 650000,
        status: ProductStatus.ACTIVE,
        categoryId: cats[0]?.id,
      },
      {
        name: 'Tủ trung tâm báo cháy 4 zone GESE-FP04',
        slug: 'tu-trung-tam-bao-chay-4-zone-gese-fp04',
        sku: 'GESE-FP04',
        shortDescription: 'Tủ trung tâm báo cháy 4 zone, màn hình LCD, hỗ trợ 128 địa chỉ.',
        specifications: { 'Zone': '4', 'Địa chỉ': '128', 'Nguồn': '220VAC/24VDC' },
        price: 12500000,
        status: ProductStatus.ACTIVE,
        categoryId: cats[1]?.id,
      },
    ]);
    console.log('Products seeded');
  }

  // News Categories
  const newsCatRepo = AppDataSource.getRepository(NewsCategory);
  if ((await newsCatRepo.count()) === 0) {
    await newsCatRepo.save([
      { name: 'Kiến thức PCCC', slug: 'kien-thuc-pccc', sortOrder: 1 },
      { name: 'Quy định pháp luật', slug: 'quy-dinh-phap-luat', sortOrder: 2 },
      { name: 'Tin công ty', slug: 'tin-cong-ty', sortOrder: 3 },
    ]);
    console.log('News categories seeded');
  }

  // Articles
  const articleRepo = AppDataSource.getRepository(Article);
  if ((await articleRepo.count()) === 0) {
    const newsCats = await newsCatRepo.find();
    const admin = await userRepo.findOneBy({ role: Role.SUPER_ADMIN });
    await articleRepo.save([
      {
        title: 'Hướng dẫn lắp đặt hệ thống báo cháy địa chỉ từ A-Z',
        slug: 'huong-dan-lap-dat-he-thong-bao-chay-dia-chi',
        excerpt: 'Tìm hiểu quy trình lắp đặt hệ thống báo cháy địa chỉ đúng chuẩn TCVN.',
        content: '<h2>Bước 1: Khảo sát</h2><p>Kỹ sư khảo sát thực tế...</p>',
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(),
        categoryId: newsCats[0]?.id,
        authorId: admin?.id,
      },
      {
        title: 'QCVN 06:2022/BXD — Những thay đổi quan trọng',
        slug: 'qcvn-06-2022-bxd-thay-doi-quan-trong',
        excerpt: 'Tổng hợp điểm mới trong quy chuẩn QCVN 06:2022/BXD.',
        content: '<p>Quy chuẩn kỹ thuật quốc gia QCVN 06:2022/BXD...</p>',
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(),
        categoryId: newsCats[1]?.id,
        authorId: admin?.id,
      },
    ]);
    console.log('Articles seeded');
  }

  // Projects
  const projectRepo = AppDataSource.getRepository(Project);
  if ((await projectRepo.count()) === 0) {
    await projectRepo.save([
      {
        title: 'Hệ thống PCCC nhà máy sản xuất linh kiện điện tử',
        slug: 'he-thong-pccc-nha-may-linh-kien-dien-tu',
        client: 'Công ty TNHH Điện tử ABC Việt Nam',
        location: 'KCN Yên Phong, Bắc Ninh',
        description: 'Thiết kế & thi công hệ thống báo cháy địa chỉ và chữa cháy Sprinkler cho nhà xưởng 45.000 m².',
        scope: ['Thiết kế hệ thống', 'Thi công lắp đặt', 'Nghiệm thu PCCC'],
        completedAt: new Date('2023-09-01'),
        status: ProjectStatus.ACTIVE,
      },
      {
        title: 'Giải pháp PCCC & an ninh Riverside Plaza',
        slug: 'giai-phap-pccc-an-ninh-riverside-plaza',
        client: 'Riverside Plaza Investment',
        location: 'Quận 1, TP. Hồ Chí Minh',
        description: 'Tích hợp hệ thống chữa cháy, báo cháy và camera giám sát cho TTTM 6 tầng.',
        scope: ['Hệ thống chữa cháy', 'Hệ thống báo cháy', 'Camera giám sát'],
        completedAt: new Date('2022-08-01'),
        status: ProjectStatus.ACTIVE,
      },
    ]);
    console.log('Projects seeded');
  }

  console.log('Seed completed!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
