import React from 'react';
import Image from 'next/image';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CardCover } from '@mui/joy';
import Link from "next/link";

const Mui_Card = ({ imageUrl, title, description, linkref }) => {
    return (
      <Card color="neutral" orientation="vertical" variant="soft" sx={{ width: 320, backgroundColor: '#171717', backgroundImage: 'linear-gradient(to bottom, rgba(23, 23, 23, 1), rgba(23, 23, 23, 0.8))' }}>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Image
            width={320}
            height={200}
            src={imageUrl}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <div>
          <Typography textColor="#fff" level="title-lg" sx={{mt:'2px',mb:'6px'}}>{title}</Typography>
          <Typography textColor="#fff" level="body-md">{description}</Typography>
        </div>
        <CardContent orientation="horizontal" sx={{ backgroundColor: 'rgba(23, 23, 23, 0.8)' }}>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          >
            <Link href={linkref}>
              Explore
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
};
  
export default Mui_Card;
