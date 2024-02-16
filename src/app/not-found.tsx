"use client";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Sidebar from "@/components/sidebar";
import "./globals.css"
import MissingPage from '@/pages/404';
import FlareCursor from '@/components/flare_cursor';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound()
{
  const router = useRouter();
  router.push("/");
};