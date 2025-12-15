import {Worker, Job} from 'bullmq';
import {JobType, SendEmailJobData} from '../types';
import {connection} from '../queue';
import {logger} from '../../logger';
import {emailService} from '../../services/emailService';
import path from 'path';
import fs from 'fs';

export function createEmailWorker(): Worker {
  const worker = new Worker(
    JobType.SEND_EMAIL,
    async (job: Job<SendEmailJobData>) => {
      logger.info(`Processing email job ${job.id}`, {
        to: job.data.to,
        subject: job.data.subject,
      });

      try {
        // Load and render template
        const templatePath = path.join(__dirname, '../../templates/email', `${job.data.template}.html`);
        let html = fs.readFileSync(templatePath, 'utf-8');
        
        // Replace placeholders
        Object.keys(job.data.data).forEach((key) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          html = html.replace(regex, job.data.data[key]);
        });

        await emailService.sendEmail(
          job.data.to,
          job.data.subject,
          html,
        );

        logger.info(`Email job ${job.id} completed`);
        return {success: true};
      } catch (error) {
        logger.error(`Email job ${job.id} failed:`, error);
        throw error;
      }
    },
    {
      connection,
      concurrency: 5,
    },
  );

  worker.on('completed', (job) => {
    logger.info(`Email job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Email job ${job?.id} failed:`, err);
  });

  return worker;
}



