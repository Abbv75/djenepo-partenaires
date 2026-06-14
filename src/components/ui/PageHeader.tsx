import React from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

interface PageHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactElement;
}

export function PageHeader({ 
  title, 
  actionLabel, 
  onAction, 
  actionIcon = <FiPlus /> 
}: PageHeaderProps) {
  return (
    <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
      <Heading size="lg" color="gray.800" fontWeight="800" letterSpacing="tight">
        {title}
      </Heading>
      
      {actionLabel && onAction && (
        <Button 
          leftIcon={actionIcon} 
          variant="brand" 
          onClick={onAction}
          borderRadius="12px"
          boxShadow="0 4px 14px 0 rgba(43,91,196,0.39)"
          _hover={{ 
            transform: 'translateY(-2px)', 
            boxShadow: '0 6px 20px rgba(43,91,196,0.3)' 
          }}
          transition="all 0.3s ease"
        >
          {actionLabel}
        </Button>
      )}
    </Flex>
  );
}
